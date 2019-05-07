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
        ],
    },
    plugins: [new HtmlWebpackPlugin({
        title: 'Youtube client',
    }), new HtmlWebpackTagsPlugin({
        tags: ['./src/style.css', 'https://use.fontawesome.com/releases/v5.8.1/css/all.css'],
        usePublicPath: false,
    })],
};
