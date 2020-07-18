const HtmlWebpackPlugin = require("html-webpack-plugin");
const path = require("path");
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const CopyWebpackPlugin = require('copy-webpack-plugin');
const {
    CleanWebpackPlugin
} = require('clean-webpack-plugin');
const webpack = require('webpack');

module.exports = {
    entry: "./src/app.js",
    output: {
        path: path.resolve(__dirname, "dist"),
        filename: "app.js"
    },
    module: {
        rules: [{
                test: [/.css$|.scss$/],
                use: [
                    MiniCssExtractPlugin.loader,
                    'css-loader',
                    'sass-loader',
                ]
            },
            {
                test: /.(png|jpe?g|gif|svg|woff|woff2|otf|ttf|eot|ico)$/,
                use: [{
                    loader: 'file-loader',
                    options: {
                        name: '[name].[ext]',
                        outputPath: 'assets/images/'
                    }
                }]
            },
            {
                // Exposes jQuery for use outside Webpack build
                test: require.resolve('jquery'),
                use: [{
                    loader: 'expose-loader',
                    options: 'jQuery'
                }, {
                    loader: 'expose-loader',
                    options: '$'
                }]
            }

        ]
    },
    resolve: {
        alias: {
            '@img': path.resolve(__dirname, 'src/assets/images'),
            '@': path.resolve(__dirname, 'src'),
        },
        modules: [
            'node_modules',
            path.resolve(__dirname, 'src')
        ],
        extensions: ['.js']
    },

    plugins: [
        new HtmlWebpackPlugin({
            title: 'index',
            template: 'src/index.html',
            inject: true,
            minify: {
                removeComments: true,
                collapseWhitespace: true
            }
        }),
        new HtmlWebpackPlugin({
            filename: 'detail.html',
            template: 'src/detail.html',
            minify: {
                removeComments: true,
                collapseWhitespace: true
            }
        }),
        new MiniCssExtractPlugin({
            filename: 'style.css'
        }),
        new CopyWebpackPlugin({
            patterns: [
                { from: './src/assets/images', to: 'assets/images' },
                { from: './src/pages', to: 'pages' },
                { from: './src/nav-detail.html', to: '' },
                { from: './src/nav-home.html', to: '' },
                { from: './src/offline.html', to: '' },
                { from: './src/detail.html', to: '' },
                { from: './src/sw.js', to: '' },
                { from: './src/manifest.json', to: '' },
            ],
        }),
        new CleanWebpackPlugin()

    ],
}