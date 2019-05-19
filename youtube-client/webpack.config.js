const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const HtmlWebpackTagsPlugin = require('html-webpack-tags-plugin');

module.exports = {
    entry: './src/index.js',
    output: {
        filename: 'app.bundle.js',
        path: path.resolve(__dirname, 'dist'),
    },
    devtool: 'source-map',
    module: {
        rules: [
            { enforce: 'pre', test: /\.js$/, loader: 'eslint-loader' },
            {
                test: /\.js$/,
                exclude: /(node_modules)/,
                use: {
                    loader: 'babel-loader',
                },
            },
            {
                test: /\.css$/,
                use: ['style-loader', 'css-loader'],
            },
            {
                test: /\.(woff(2)?|ttf|eot|svg)(\?v=\d+\.\d+\.\d+)?$/,
                use: [{
                    loader: 'file-loader',
                    options: {
                        name: '[name].[ext]',
                        outputPath: 'fonts/',
                    },
                }],
            },
        ],
    },
    plugins: [new HtmlWebpackPlugin({
        title: 'Youtube client',
        favicon: './src/accets/youtube.ico',
        meta: {
            viewport: 'width=device-width, initial-scale=0.85, shrink-to-fit=no',
        },
    }), new HtmlWebpackTagsPlugin({
        tags: ['./src/style.css', 'https://use.fontawesome.com/releases/v5.8.1/css/all.css'],
        usePublicPath: false,
    })],
};
