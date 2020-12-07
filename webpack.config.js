const HtmlWebPackPlugin = require("html-webpack-plugin");
const WorkerPlugin = require('worker-plugin');
const CompressionPlugin = require('compression-webpack-plugin');
const CopyPlugin = require('copy-webpack-plugin');
const MomentLocalesPlugin = require('moment-locales-webpack-plugin');

const path = require('path');

module.exports = {
    entry: ["index.js"],
    watchOptions: {
        aggregateTimeout: 200,
        poll: 1000
    },
    output: {
        path: path.resolve(__dirname, 'build'),
        filename: 'chunk-[name]-[contenthash].js',
        globalObject: "(typeof self!='undefined'?self:this)",
        pathinfo: false
    },
    resolve: {
        modules: ['node_modules', path.resolve(__dirname, 'src/js')],
        alias: {
            images: path.resolve(__dirname, 'src/images/'),
            components: path.resolve(__dirname, 'src/js/components/'),
            workers: path.resolve(__dirname, 'src/js/workers/'),
            styles: path.resolve(__dirname, 'src/scss/'),
            componentStyles: path.resolve(__dirname, 'src/scss/components/')
        }
    },
    optimization: {
        runtimeChunk: 'single',
        splitChunks: {
            chunks: 'all',
            maxInitialRequests: Infinity,
            minSize: 0,
            cacheGroups: {
                reactVendor: {
                    test: /[\\/]node_modules[\\/](react|react-dom)[\\/]/,
                    name: "react-vendor"
                },
                utilityVendor: {
                    test: /[\\/]node_modules[\\/](lodash|moment|moment-timezone)[\\/]/,
                    name: "utility-vendor"
                },
                bootstrapVendor: {
                    test: /[\\/]node_modules[\\/](react-bootstrap)[\\/]/,
                    name: "bootstrap-vendor"
                },
                threeVendor: {
                    test: /[\\/]node_modules[\\/](three)[\\/]/,
                    name: "three-vendor"
                },
                vendor: {
                    test: /[\\/]node_modules[\\/](!react-bootstrap)(!lodash)(!moment)(!moment-timezone)[\\/]/,
                    name: "vendor"
                },
            },
        },
    },
    devServer: {
        historyApiFallback: true
    },
    plugins: [
        new HtmlWebPackPlugin({
            template: "./src/index.html",
            filename: "./index.html",
        }),
        new MomentLocalesPlugin({
            localesToKeep: ['es-us', 'pl'],
        }),
        new WorkerPlugin(),
        new CompressionPlugin({
            algorithm: 'gzip',
            test: /\.js$/,
        }),
        new CopyPlugin({
            patterns: [
                {from: path.resolve(__dirname, 'src/images'), to: path.resolve(__dirname, 'build/images')},
            ],
        }),
    ],
    module: {
        rules: [
            { // JS + JSX
                test: /\.(js|jsx)$/,
                include: path.resolve(__dirname, 'src'),
                exclude: /node_modules/,
                use: [{loader: 'babel-loader'}]
            },
            { // Files
                test: /\.(png|jpg|gif|ico|svg)$/,
                use: [
                    {
                        loader: 'file-loader',
                        options: {
                            name: '[path][name].[ext]',
                            context: path.resolve(__dirname, "src/"),
                            useRelativePath: true,
                            outputPath: '/',
                            publicPath: '../',
                            useRelativePaths: true
                        }
                    }
                ]
            },
            { // SCSS
                test: /\.(scss)$/,
                use: [
                    {loader: "style-loader"},
                    {loader: "css-loader"},
                    {loader: "sass-loader"}
                ]
            },
            { // CSS
                test: /\.(css)$/,
                use: [
                    {loader: "style-loader"},
                    {loader: "css-loader"},
                    {loader: "sass-loader"}
                ]
            }
        ]
    },
    externals: {
        config: JSON.stringify({
            apiUrl: 'http://0.0.0.0:8000'
        })
    },
    //stats: "verbose"
}
