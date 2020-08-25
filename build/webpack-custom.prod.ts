import commonConfig from "./webpack-custom";
import { Configuration } from "webpack";
const TerserPlugin = require("terser-webpack-plugin");

export default function (config: Configuration) {
    config = commonConfig(config);

    config.optimization.minimizer = [];
    config.optimization.minimize = true;
    config.optimization.minimizer.push(new TerserPlugin({
        parallel: false,
        terserOptions: {
            compress: {
                global_defs: {"ngDevMode": false, "ngI18nClosureMode": false, "ngJitMode": false }
            }
        }
    }));

    return config;
}
