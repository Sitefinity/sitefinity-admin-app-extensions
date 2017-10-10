var DelegatedModule = require("./delegated.module");
var DelegatedSourceDependency = require("webpack/lib/dependencies/DelegatedSourceDependency");
var ExternalsPlugin = require("webpack/lib/ExternalsPlugin");

const initialModuleId = 100000;
const extensionsKey = "extensions";

function ImportPlugin(options) {
    this.options = {
        context: options.context,
        modules: options.manifest.modules
    };
}

ImportPlugin.prototype.apply = function (compiler) {

    // TODO: remove this
    // TODO: try to remove the delgating module and replace the webpack require directly

    var externals = {};
    this.options.source = "dll-reference " + "iris";
    externals[this.options.source] = "iris";
    compiler.apply(new ExternalsPlugin("var", externals));
    var alteredModules = {};

    compiler.plugin("compile", function (params) {
        var nmf = params.normalModuleFactory;

        // fake counter to get the modules to have some ids
        var counter = 0;
        nmf.plugin("module", function (module) {
            if (module.libIdent) {
                var request = module.libIdent(this.options);

                // TODO: for debuggin only. remove this once extensions are separated into their own repo
                if (request.startsWith("../dist")) {
                    request = request.replace("../dist", "./node_modules/iris");
                }

                const found = this.options.modules.find(x => x === request);
                if (found) {
                    var newValue;
                    if (alteredModules[module.request]) {
                        newValue = alteredModules[module.request];
                    } else {
                        newValue = ++counter;
                        alteredModules[module.request] = newValue;
                    }

                    return new DelegatedModule(this.options.source, newValue, request);
                }
            }
            return module;
        }.bind(this));

    }.bind(this));

    compiler.plugin("compilation", function (compilation, params) {
        var normalModuleFactory = params.normalModuleFactory;
        compilation.dependencyFactories.set(DelegatedSourceDependency, normalModuleFactory);
    });

    compiler.plugin("compilation", function (compilation) {
        compilation.plugin("optimize-module-ids", function (modules) {
            modules.forEach(function (module) {
                if (module.userRequest && module.userRequest.endsWith("__extensions_index.ts")) {
                    module.id = initialModuleId;
                }
                else {
                    if (module.id <= initialModuleId) {
                        module.id = module.id + initialModuleId + 1;
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
                // hack to force webpack to output the extensions bundle as a single chunk
                // TODO: check how this works with multiple chunks
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
