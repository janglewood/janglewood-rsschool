const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = {
    entry: './src/app.js',
    output: {
        filename: 'app.bundle.js',
        path: path.resolve(__dirname, 'dist')
    },
    devServer: {
        contentBase: path.resolve(__dirname, 'src'),
        compress: true,
        port: 3000
    },
    plugins: [new HtmlWebpackPlugin({
        title: "Piskel clone",
        template: "src/index.html",
    })],
};