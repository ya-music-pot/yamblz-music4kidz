const { resolve } = require('path');
const webpack = require('webpack');
const ExtractTextPlugin = require('extract-text-webpack-plugin');

const ENV = process.env.NODE_ENV;

module.exports = {
  entry: {
    app: [
      'babel-polyfill',
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
      {
        test: /\.js$/,
        exclude: /node_modules/,
        loader: 'babel-loader',
        options: {
          presets: [
            ['es2015', { loose: true, modules: false }],
            'react',
            'stage-2',
          ],
        },
      },
      { test: /.json$/, use: { loader: 'json-loader' } },
      {
        test: /\.(ttf|png|ico|jpg|jpeg|gif|svg)$/,
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
        use: [
          'style-loader',
          {
            loader: 'css-loader',
            options: {
              modules: true,
              sourceMap: true,
              localIdentName: '[local]___[hash:base64:8]',
            },
          },
          'sass-loader',
          'postcss-loader',
        ],
      },
      // {
      //   test: /\.scss$/,
      //   exclude: /node_modules/,
      //   loader: ExtractTextPlugin.extract({
      //     fallback: 'style-loader',
      //     use: [
      //       {
      //         loader: 'css-loader',
      //         options: {
      //           modules: true,
      //           sourceMap: true,
      //           localIdentName: '[local]___[hash:base64:8]',
      //         },
      //       },
      //       'sass-loader',
      //       'postcss-loader',
      //     ],
      //   }),
      // },
    ],
  },

  resolve: {
    extensions: ['.js'],
    alias: {
      _app: resolve('src'),
      _data: resolve('src/data'),
      _pages: resolve('src/pages'),
      _actions: resolve('src/actions'),
      _settings: resolve('src/settings'),
      _helpers: resolve('src/helpers'),
      _reducers: resolve('src/reducers'),
      _decorators: resolve('src/decorators'),
      _components: resolve('src/components'),
      _middlewares: resolve('src/middlewares'),
    },
  },
  plugins: [
    new webpack.DefinePlugin({
      'process.env.NODE_ENV': JSON.stringify(ENV),
      isProduction: ENV === 'production',
    }),

    new ExtractTextPlugin({
      filename: 'style.css',
      allChunks: true,
    }),
  ],

  devServer: {
    stats: 'minimal',
    proxy: [
      {
        context: '/artists/**',
        secure: false,
        target: 'https://api.music.yandex.net/',
      },
    ],
  },
};
