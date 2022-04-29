import { Configuration, ContextReplacementPlugin, RuleSetRule } from "webpack";
import ImportPlugin from "./import.plugin";

declare var __webpack_hash__: any;

export default (
    config: Configuration
) => {
    const mainBundlePath = config.entry["main"];

    config.entry = {
        "sample.extensions.bundle": mainBundlePath
    };

    config.plugins.push(
        new ContextReplacementPlugin(/angular(\\|\/)core/, __dirname, {}),
    );
    config.plugins.push(new ImportPlugin({
        context: ".",
        manifest: require("@progress/sitefinity-adminapp-sdk/manifest.json")
    }));

    // config.externals = {
    //     adminapp: "adminapp"
    // }

    config.optimization.minimize = false;
    config.optimization.minimizer = [];
    // config.optimization.chunkIds = "natural";
    // config.optimization.splitChunks = {
    //     cacheGroups: {
    //         default: false
    //     }
    // }

    config.optimization.moduleIds = "natural";
    config.optimization.runtimeChunk = false;

    config.module.rules = config.module.rules.filter(x => !(x as RuleSetRule).test.toString().includes("css"));
    config.module.rules.push({
        test: /\.css$/i,
        use: [
            "style-loader",
            "css-loader"
        ],
    });

    if (config["devServer"]) {
        config["devServer"].historyApiFallback = true;
        config["devServer"].hot = false;
    }

    return config;
}
