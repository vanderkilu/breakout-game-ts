const path = require('path');

module.exports = {
  mode: process.env.NODE_ENV || "development",
  devtool: "source-map",
  entry: './src/index.ts',
  output: {
    filename: 'bundle.js',
    path: __dirname
  },
  resolve: {
    extensions: ['.ts', '.js']
  },
  module: {
    rules: [
      { test: /\.ts$/, loader: 'ts-loader' }
    ]
  }
};