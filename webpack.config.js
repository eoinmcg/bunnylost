const path = require('path');
const webpack = require('webpack');
 
module.exports = {
  entry: './src/game/index.js',
  output: { 
    path: path.resolve(__dirname, 'dist'),
    filename: 'bundle.js' },
  resolve: {
    alias: {
    }
  },
  devServer: {
      contentBase: './dist',
      hot: true
  },
  module: {
    loaders: [
      {
        loader: 'babel-loader',
        exclude: /node_modules/,
        query: {
          presets: ['es2015']
        }
      }
    ]
  },
};

