const HtmlWebPackPlugin = require("html-webpack-plugin");
const WorkerPlugin = require('worker-plugin');
const { SourceMapDevToolPlugin } = require("webpack");

const path = require('path');

module.exports = {
    entry: [
        "./src/index.js"
    ],
    output: {
        path: __dirname,
        filename: 'bundle.js',
    },
    resolve: {
        modules: [path.resolve(__dirname, 'src'), 'node_modules']
    },
    devServer: {
        disableHostCheck: true,
        historyApiFallback: true
    },
    plugins: [
        new HtmlWebPackPlugin({
            template: "./src/index.html",
            filename: "./index.html"
        }),
        new WorkerPlugin(),
        new SourceMapDevToolPlugin({
            filename: "[file].map"
        }),
    ],
    module: {
        rules: [
             {
                test: /\.js$/,
                enforce: 'pre',
                use: [
                    {
                        loader: 'source-map-loader'
                    }
                ],
              },
            {
                test: /\.(js|jsx)$/,
                include: path.resolve(__dirname, 'src'),
                exclude: /node_modules/,
                use: [
                    {
                        loader: 'babel-loader'
                    }
                ]
            },
            {
                test: /\.html$/,
                use: [
                    {
                        loader: "html-loader"
                    }
                ]
            },
            // Files
            {
                test: /\.(png|jpg|gif|ico|svg)$/,
                use: [
                    {
                        loader: 'file-loader',
                        options: {
                            name: '[name].[ext]',
                            include: path.resolve(__dirname, 'src/images'),
                            outputPath: 'images/',
                            context: 'src/images',
                            useRelativePaths: true
                        }
                    }
                ]
            },
            // SCSS
            {
                test: /\.(scss)$/,
                use: [
                    {
                        loader: "style-loader"
                    },
                    {
                        loader: "css-loader",
                        options: {
                            sourceMap: true,
                        }
                    },
                    {
                        loader: "sass-loader",
                        options: {
                            sourceMap: true,
                        }
                    }]
            },
            {
                test: /\.tsx?/,
                loader: 'ts-loader',
            }
        ]
    },

    externals: {
        config: JSON.stringify({
            apiUrl: 'http://0.0.0.0:8000'
        })
    }
}
