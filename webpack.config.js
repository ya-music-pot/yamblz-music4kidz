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
      { test: /.json$/, use: { loader: 'json-loader' } },
      {
        test: /\.(png|ico|jpg|jpeg|gif|svg)$/,
        use: [
          {
            loader: 'file-loader',
          },
        ],
      },
      {
        test: /\.css$/,
        use: [
          'style-loader',
          'css-loader',
        ],
      },
      {
        test: /\.scss$/,
        exclude: /node_modules/,
        loader: 'style-loader!css-loader?modules&sourceMap&localIdentName=[local]___[hash:base64:5]!sass-loader!postcss-loader',
      },
    ],
  },

  resolve: {
    extensions: ['.js'],
    alias: {
      _app: resolve('src'),
      _pages: resolve('src/pages'),
      _settings: resolve('src/settings'),
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
