const HtmlWebPackPlugin = require("html-webpack-plugin");
const MomentLocalesPlugin = require('moment-locales-webpack-plugin');
const CompressionPlugin = require('compression-webpack-plugin');
const CopyPlugin = require('copy-webpack-plugin');

const path = require('path');

const resolvePath = pathSegments => path.resolve(__dirname, pathSegments);

const optimization = {
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
    }
};

module.exports = {
    watchOptions: {
        aggregateTimeout: 200,
        poll: 1000
    },
    output: {
        filename: 'chunk-[name]-[contenthash].js',
        sourceMapFilename: "[name].js.map",
        globalObject: "(typeof self!='undefined'?self:this)",
        pathinfo: false
    },
    devtool: "source-map",
    resolve: {
        extensions: [".js", ".jsx"],
        modules: ['node_modules', resolvePath('src')],
        alias: {
            images: resolvePath('assets/images/'),
            fonts: resolvePath('assets/fonts/'),
            pages: resolvePath('src/pages/'),
            configs: resolvePath('configs/'),
            appRedux: resolvePath('src/redux/'),
            components: resolvePath('src/components/'),
            util: resolvePath('src/util/')
        }
    },
    optimization: optimization,
    devServer: {
        port: 3000,
        host: "0.0.0.0",
        disableHostCheck: true,
        historyApiFallback: true,
        headers: {
            // "Cross-Origin-Embedder-Policy": "require-corp",
            // "Cross-Origin-Opener-Policy": "same-origin"
        }
    },
    plugins: [
        new HtmlWebPackPlugin({template: resolvePath("src/index.html")}),
        new MomentLocalesPlugin({localesToKeep: ['es-us', 'pl']}),
        new CompressionPlugin({algorithm: 'gzip', test: /\.js$/}),
        new CopyPlugin({
            patterns: [
                {from: resolvePath('assets/fonts'), to: resolvePath('dist/assets/images')},
                {from: resolvePath('assets/images'), to: resolvePath('dist/assets/images')},
                {from: resolvePath('assets/translation'), to: resolvePath('dist/assets/translation')},
            ],
        }),
    ],
    module: {
        rules: [
            { // JS + JSX + TS + TSX
                test: /\.(js|jsx|ts|tsx)$/,
                include: resolvePath('src'),
                exclude: /node_modules/,
                use: [{loader: 'babel-loader'}]
            },
            { // Files
                test: /\.(png|jpg|gif|ico|svg|ttf|woff|otf)$/,
                use: [
                    {
                        loader: 'file-loader',
                        options: {
                            name: '[path][name].[ext]',
                            context: path.resolve(__dirname),
                            useRelativePath: true
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
    }
    //stats: "verbose"
};