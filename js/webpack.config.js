'use strict';

const webpack = require('webpack'),
      entryFile = '',
      outputFile = '';

module.exports = {
  entry:  './src/' + entryFile,
  output: {
    path: './dist',
    filename: outputFile
  },
  module: {
    preLoaders: [
      {
        test: /\.js/,
        loader: 'eslint-loader',
        include: __dirname + '/src'
      }
    ],
    loaders: [
      {
        test: /\.js/,
        loader: 'babel',
        include: __dirname + '/src',
        query: {
          presets: ['es2015']
        }
      }
    ]
  }
};
