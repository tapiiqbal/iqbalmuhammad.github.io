const merge = require("webpack-merge");
const UglifyJsPlugin = require('uglifyjs-webpack-plugin');
const OptimizeCSSAssetsPlugin = require('optimize-css-assets-webpack-plugin');
const common = require("./webpack.common.js");

module.exports = merge(common, {
    mode: "production",
    module: {
        rules: [{
            test: /\.js$/,
            use: [{
                loader: "babel-loader",
                options: {
                    presets: ["@babel/preset-env"]
                }
            }]
        }]
    },
    optimization: {
        minimizer: [
            new UglifyJsPlugin(),
            new OptimizeCSSAssetsPlugin()
        ]
    }
});