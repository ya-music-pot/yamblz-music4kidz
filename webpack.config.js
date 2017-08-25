const { resolve } = require('path');

module.exports = {
  entry: {
    app: [
      resolve('src/app'),
    ],
  },
  output: {
    filename: '[name].js',
    path: resolve('dist'),
    publicPath: '/dist/',
  },

  module: {
    rules: [
      { test: /\.js$/, exclude: /node_modules/, loader: 'babel-loader' },
      { test: /\.jsx$/, exclude: /node_modules/, loader: 'babel-loader' },
    ]
  },
  resolve: {
    extensions: ['.js'],
    alias: {
      _app: resolve('src'),
      _pages: resolve('src/pages'),
      _components: resolve('src/components'),
    },
  },
};
