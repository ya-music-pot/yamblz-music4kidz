const { resolve } = require('path');
const webpack = require('webpack');
const ENV = process.env.NODE_ENV;

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
    ],
  },
  resolve: {
    extensions: ['.js'],
    alias: {
      _app: resolve('src'),
      _pages: resolve('src/pages'),
      _components: resolve('src/components'),
    },
  },
  plugins: [
    new webpack.DefinePlugin({
      'process.env.NODE_ENV': JSON.stringify(ENV),
      isProduction: ENV === 'production',
    }),
  ],
};
