import { Compilation, Compiler, ExternalsPlugin, NormalModule } from "webpack";
import DelegatedSourceDependency from "webpack/lib/dependencies/DelegatedSourceDependency";
import DelegatedModuleCustom from "./delegated.module";

const initialModuleId = `ext_mod_id_${Date.now()}`;
const constants = require("./constants");

export default class ImportPlugin {
    options: any;

    constructor(options: any) {
        let compatibleVersionsTags = "";

        try {
            // try get latest version tag
            const latestCompatibleVersionTag = require('child_process')
                .execSync('git describe --abbrev=0 --tags 2> nul')
                .toString();

            // get all version tags for the commit specified by the latest tag
            compatibleVersionsTags = require('child_process')
                .execSync(`git show -s --format=%D ${latestCompatibleVersionTag}`)
                .toString();

            compatibleVersionsTags = compatibleVersionsTags.trim().replace("tag: ", "");
        }
        catch (err) {
            if (err.message.includes('Command failed')) {
                console.warn('\x1b[33m%s\x1b[0m', 'Version verification for these extensions will not be available. Most probably this is either not a git repository or git is not installed. Please refer to: https://github.com/Sitefinity/sitefinity-admin-app-extensions');
            } else {
                throw err;
            }
        }

        this.options = {
            context: options.context,
            modules: options.manifest.modules,
            compatibleVersionsTags: compatibleVersionsTags
        };
    }

    apply(compiler: Compiler) {
        const pluginName = this.constructor.name;
        const source = "dll-reference adminapp";

        const externalsPlugin = new ExternalsPlugin("var", source)
        externalsPlugin.apply(compiler);

        const delegatedModuleCache = {};
        let delegatedModuleCounter = 0;

        compiler.hooks.compilation.tap(pluginName, (...params) => {
            const nmf = params[1].normalModuleFactory;
            const compilation = params[0];

            nmf.hooks.module.tap(pluginName, module => {
                if (module) {
                    const request = module.libIdent(this.options);

                    const found = this.options.modules.find(x => x === request);
                    if (found) {
                        let delegatedModuleId = null;
                        if (delegatedModuleCache.hasOwnProperty(request)) {
                            delegatedModuleId = delegatedModuleCache[request];
                        } else {
                            delegatedModuleId = ++delegatedModuleCounter;
                            delegatedModuleCache[request] = delegatedModuleId;
                        }
                        return new DelegatedModuleCustom(source, { id: delegatedModuleId }, module.type, request, compilation) as any;
                    }
                }

                return module;
            });
        });



        compiler.hooks.emit.tap(pluginName, compilation => {
            compilation.hooks.processAssets.tap({
                name: pluginName,
                stage: Compilation.PROCESS_ASSETS_STAGE_ADDITIONAL
            }, (assets) => {
                const assetCompare = `${constants.extensionsKey}.bundle.js`;
                const compilationAssetName = Object.keys(assets).find(x => x === assetCompare);
                const asset = assets[compilationAssetName];
                if (asset) {
                    const originalSource = asset.source().toString();

                    const indexOfMethod = originalSource.lastIndexOf("getNgModules");
                    const indexOfExports = originalSource.indexOf("exports.", indexOfMethod);
                    const indexOfDelimiter = originalSource.indexOf(";", indexOfExports);

                    const codeToInject = `arguments[1].metadata = { compatibleVersionsTags: ${JSON.stringify(this.options.compatibleVersionsTags)}, name: "${constants.extensionsKey}" };`;
                    const modifiedSource = originalSource.slice(0, indexOfDelimiter + 1) + codeToInject + originalSource.slice(indexOfDelimiter + 1);

                    asset.source = () => { return modifiedSource; };

                    asset.size = () => { return modifiedSource.length; };
                }

                // remove unneeded runtime bundle
                const assetsToRemove = `runtime.js`;

                for (const key in compilation.assets) {
                    if (key.includes(assetsToRemove)) {
                        compilation.deleteAsset(key);
                    }
                }
            });

        });

        compiler.hooks.compilation.tap(pluginName, (compilation, params) => {
            const normalModuleFactory = params.normalModuleFactory;
            compilation.dependencyFactories.set(DelegatedSourceDependency, normalModuleFactory);
        });

        let optimizeCounter = 1;
        compiler.hooks.compilation.tap(pluginName, compilation => {
            compilation.hooks.optimizeModuleIds.tap(pluginName, function (modules: NormalModule[]) {
                modules.forEach(function (module: NormalModule) {
                    if (module.userRequest && module.userRequest.endsWith(constants.indexFileName)) {
                        compilation.chunkGraph.setModuleId(module, initialModuleId);
                    } else {
                        compilation.chunkGraph.setModuleId(module, `${initialModuleId}_${optimizeCounter++}`);
                    }
                });
            });

            compilation.hooks.optimizeChunkIds.tap(pluginName, chunks => {
                const currentIncrease = 1000;
                Array.from(chunks).forEach(function (chunk) {
                    const modifiedIds = [];
                    chunk.ids.forEach(function (id) {
                        const modified = parseInt(id.toString()) + currentIncrease;
                        modifiedIds.push(modified);
                    });

                    chunk.ids = modifiedIds;
                });
            });
        });
    }
}
