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
            manifest: require("@progress/sitefinity-adminapp-sdk/manifest.json")
        })
    ]);

    config.optimization.moduleIds = "natural";
    config.module.rules = config.module.rules.filter(x => !x.test.toString().includes(".css"));
    config.module.rules.push({
        test: /\.css$/,
        use: [ "css-to-string-loader", "css-loader" ]
    });

    if (config["devServer"]) {
        config["devServer"].historyApiFallback = true;
    }

    return config;
}
