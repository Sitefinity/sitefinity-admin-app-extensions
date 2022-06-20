import { Configuration, ContextReplacementPlugin } from "webpack";
import ImportPlugin from "./import.plugin";

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

    config.optimization.minimize = false;
    config.optimization.minimizer = [];

    config.optimization.moduleIds = "natural";
    config.optimization.runtimeChunk = false;

    if (config["devServer"]) {
        config["devServer"].historyApiFallback = true;
        config["devServer"].hot = false;
    }

    return config;
}
