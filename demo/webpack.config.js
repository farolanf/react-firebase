const webpack = require('webpack');
const path = require('path');

module.exports = {
  entry: './demo/src/index.js',
  output: {
    filename: 'bundle.js',
    path: path.resolve('./demo/public'),
  },
  module: {
    rules: [
      {
        test: /\.js$/,
        exclude: /node_modules/,
        use: [
          'react-hot-loader',
          {
            loader: 'babel-loader',
            options: {
              presets: ['env', 'react'],
            },
          },
        ],
      },
    ],
  },
  plugins: [
    new webpack.NamedModulesPlugin(),
  ],
  devServer: {
    contentBase: './demo/public',
    watchContentBase: true,
  },
};