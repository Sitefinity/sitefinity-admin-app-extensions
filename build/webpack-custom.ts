import { Configuration, ContextReplacementPlugin } from "webpack";
import ImportPlugin = require("./import.plugin");

export default function (config: Configuration) {
    const mainBundlePath = config.entry["main"];

    config.entry = {
        "sample.extensions.bundle": mainBundlePath
    };

    config.plugins.push(...[
        new ContextReplacementPlugin(/angular(\\|\/)core/, __dirname, {}),
        new ImportPlugin({
            context: ".",
            manifest: require("progress-sitefinity-adminapp-sdk/manifest.json")
        })
    ]);

    config.optimization.minimizer = config.optimization.minimizer.filter(x => x.constructor.name !== "HashedModuleIdsPlugin");

    if (config["devServer"]) {
        config["devServer"].historyApiFallback = true;
    }

    return config;
}
