const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = {
  entry: './src/app.js',
  output: {
    filename: 'app.bundle.js',
    path: path.resolve(__dirname, 'dist'),
    publicPath: '/',
  },
  devtool: 'source-map',
  devServer: {
    contentBase: path.resolve(__dirname),
    compress: true,
    port: 3000,
    publicPath: '/',
  },
  module: {
    rules: [
      {
        test: /\.css$/,
        use: ['style-loader', 'css-loader'],
      },
      {
        test: /\.(woff(2)?|ttf|eot|svg|gif|png|jpe?g|cur)(\?v=\d+\.\d+\.\d+)?$/,
        use: 'file-loader?name=[name].[ext]',
      },
    ],
  },
  plugins: [new HtmlWebpackPlugin({
    title: 'Piskel clone',
    template: './src/index.html',
  })],
};
