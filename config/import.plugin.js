var DelegatedModule = require("./delegated.module");
var DelegatedSourceDependency = require("webpack/lib/dependencies/DelegatedSourceDependency");
var ExternalsPlugin = require("webpack/lib/ExternalsPlugin");

const initialModuleId = 100000;
const constants = require("./constants");

const extensionsKey = constants.extensionsKey;

function ImportPlugin(options) {
    this.options = {
        context: options.context,
        modules: options.manifest.modules
    };
}

ImportPlugin.prototype.apply = function (compiler) {

    var externals = {};
    this.options.source = "dll-reference " + "adminapp";
    externals[this.options.source] = "adminapp";
    compiler.apply(new ExternalsPlugin("var", externals));
    var delegatedModuleCache = {};
    var delegatedModuleCounter = 0;

    compiler.plugin("compile", function (params) {
        var nmf = params.normalModuleFactory;

        nmf.plugin("module", function (module) {
            if (module.libIdent) {
                var request = module.libIdent(this.options);

                const found = this.options.modules.find(x => x === request);
                if (found) {
                    let delegatedModuleId = null;
                    if (delegatedModuleCache.hasOwnProperty(request)) {
                        delegatedModuleId = delegatedModuleCache[request];
                    } else {
                        delegatedModuleId = ++delegatedModuleCounter;
                        delegatedModuleCache[request] = delegatedModuleId;
                    }

                    return new DelegatedModule(this.options.source, delegatedModuleId, request);
                }
            }
            return module;
        }.bind(this));

    }.bind(this));

    compiler.plugin("emit", function(compilation, callback) {
        const compilationAssetName = Object.keys(compilation.assets).find(x => x.includes(constants.extensionsKey));
        const asset = compilation.assets[compilationAssetName];
        if (asset) {
            var originalSource = asset.source().toString();

            const indexOfMethod = originalSource.lastIndexOf("getNgModules");
            const indexOfExports = originalSource.indexOf("exports.", indexOfMethod);
            const indexOfDelimeter = originalSource.indexOf(";", indexOfExports);

            const codeToInject = `exports.metadata = { version: ${JSON.stringify(require("../package.json").devDependencies["progress-sitefinity-adminapp-sdk"])}, name: "${constants.extensionsKey}" };`;
            let modifiedSource = originalSource.slice(0, indexOfDelimeter + 1) + codeToInject + originalSource.slice(indexOfDelimeter + 1);

            asset.source = () => { return modifiedSource; };

            asset.size = () => { return modifiedSource.length; };
        }

        callback();
    }.bind(this));

    compiler.plugin("compilation", function (compilation, params) {
        var normalModuleFactory = params.normalModuleFactory;
        compilation.dependencyFactories.set(DelegatedSourceDependency, normalModuleFactory);
    });

    let optimizeCounter = 1;
    compiler.plugin("compilation", function (compilation) {
        compilation.plugin("optimize-module-ids", function (modules) {
            modules.forEach(function (module) {
                if (module.userRequest && module.userRequest.endsWith(constants.indexFileName)) {
                    module.id = initialModuleId;
                } else {
                    if (module.id <= initialModuleId) {
                        module.id = initialModuleId + optimizeCounter++;
                    }
                }
            });
        });

        compilation.plugin("optimize-chunk-ids", function (chunks) {
            var currentIncrease = 1000;
            chunks.forEach(function (chunk) {
                var modifiedIds = [];
                chunk.ids.forEach(function (id) {
                    var modified = id + currentIncrease;
                    modifiedIds.push(modified);
                });

                chunk.ids = modifiedIds;
                if (chunk.name === extensionsKey) {
                    chunk.entrypoints[0] = {
                        name: "app",
                        chunks: []
                    };
                }
            });
        });
    });
};

module.exports = ImportPlugin;
