const webpack = require("webpack");
const ImportPlugin = require("./import.plugin");
const path = require("path");
const constants = require("./constants");

const extensionsFileName = "./" + constants.indexFileName;
const extensionsKey = constants.extensionsKey;
const UglifyJsPlugin = require("uglifyjs-webpack-plugin");

module.exports = function(env, argv) {
    const enviroment = env.dev ? "none" : "production";
    const config = {
        cache: true,
        mode: enviroment,
        devtool: "source-map",
        entry: {
            [extensionsKey]: extensionsFileName
        },
        optimization: {
            runtimeChunk: true,
            minimize: false
        },
        output: {
            path: path.join(__dirname, "../dist"),
            filename: "./[name].bundle.js",
            pathinfo: true
        },
        devServer: {
            contentBase: path.join(__dirname, "../node_modules/progress-sitefinity-adminapp-sdk/wwwroot"),
            inline: true,
            port: 3000,
            historyApiFallback: true,
            stats: {
                colors: true, // color is life
                chunks: false
            }
        },
        plugins: [
            new webpack.ContextReplacementPlugin(/angular(\\|\/)core/, __dirname, {}),
            new ImportPlugin({
                context: ".",
                manifest: require("progress-sitefinity-adminapp-sdk/manifest.json")
            })
        ],

        resolve: {
            extensions: [".ts", ".js", ".json", ".html"]
        },

        module: {
            rules: [
                { test: /\.ts$/, use:[ "ts-loader", "angular2-template-loader" ] },
                { test: /\.html$/, use:[ "html-loader" ] },
                { test: /\.css$/, use: [ "css-to-string-loader", "css-loader" ] }
            ]
        }
    };

    if (env.production) {

        // uglify the code, so we can take advantage of a smaller bundle to reduce network traffic
        const uglifyConfig = require('./uglify.conf.json');
        const uglifyPlugin = new UglifyJsPlugin(uglifyConfig);
        config.plugins.push(uglifyPlugin);

        // no need for source maps in production
        delete config.devtool;
    }

    return config;
}
