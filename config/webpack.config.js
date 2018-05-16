var ImportPlugin = require("./import.plugin");
var path = require("path");
const constants = require("./constants");

const extensionsFileName = "./" + constants.indexFileName;
const extensionsKey = constants.extensionsKey;

module.exports = {
    cache: true,
    devtool: "source-map",
    entry: {
        [extensionsKey]: extensionsFileName
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
            { test: /\.ts$/, use:[ "awesome-typescript-loader", "angular2-template-loader" ] },
            { test: /\.html$/, use:[ "html-loader" ] },
            { test: /\.json$/, use:[ "json-loader" ] },
            { test: /\.css$/, use: [ "css-to-string-loader", "css-loader" ] }
        ]
    }
};
