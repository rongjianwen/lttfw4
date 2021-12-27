const path = require('path');
const webpack = require('webpack');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');

const mode = process.env.NODE_ENV || 'development';
const isDev = mode === 'development';

function createWebpackConfig(options) {
    const { ENV, pkg, projectDir, sourceDir } = options;
    const { libname, version } = pkg;

    return {
        entry: `${sourceDir}/index.tsx`,
        mode,
        devtool: isDev ? 'eval-source-map' : 'source-map',
        output: {
            path: path.join(projectDir, 'build'),
            filename: 'bundle.js',
            publicPath: '/'
        },
        resolve: {
            extensions: ['.tsx', '.ts', '.js', '.jsx']
        },
        module: {
            rules: [
                {
                    test: /\.([t|j]sx?)$/,
                    exclude: /node_modules/,
                    use: ['babel-loader', 'ts-loader']
                }
            ]
        },
        plugins: [
            new webpack.ProvidePlugin({
                process: 'process/browser'
            }),
            new webpack.DefinePlugin({
                'process.env': JSON.stringify(ENV)
            }),
            new MiniCssExtractPlugin({
                filename: '[name].css',
                chunkFilename: '[id].css'
            }),
            new HtmlWebpackPlugin({
                title: `${libname} - Demo: ${version}`,
                template: `${sourceDir}/index.html`,
                env: ENV
            })
        ],
        devServer: {
            port: 9000,
            hot: true,
            historyApiFallback: true,
            static: path.join(projectDir, 'static'),
            compress: true
        }
    };
}

module.exports = createWebpackConfig;
