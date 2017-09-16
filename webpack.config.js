/* eslint-disable */

const { resolve } = require('path');
const webpack = require('webpack');
const got = require('got');
const ExtractTextPlugin = require('extract-text-webpack-plugin');
const SvgStore = require('webpack-svgstore-plugin');

const API_URL = 'https://musicforchildren.herokuapp.com/';

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
        test: /\.(ttf|woff|woff2|png|ico|jpg|jpeg|gif|svg)$/,
        use: [
          {
            loader: 'file-loader',
          },
        ],
      },
      {
        test: /\.css$/,
        exclude: /node_modules/,
        use: ExtractTextPlugin.extract({
          fallback: 'style-loader',
          use: [
            'css-loader',
            'postcss-loader',
          ],
        }),
      },
      {
        test: /\.styl$/,
        exclude: /node_modules/,
        use: ExtractTextPlugin.extract({
          fallback: 'style-loader',
          use: [
            {
              loader: 'css-loader',
              options: {
                modules: true,
                importLoaders: 1,
                localIdentName: '[name]__[local]--[hash:base64:10]',
              },
            },
            'postcss-loader',
            'stylus-loader',
          ],
        }),
      },
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
      API_URL: JSON.stringify('https://musicforchildren.herokuapp.com/'),
    }),
    new ExtractTextPlugin({
      filename: 'styles.css',
      allChunks: true,
    }),
    new SvgStore({
      svgoOptions: {
        plugins: [
          { removeTitle: true },
        ],
      },
      prefix: 'icon-',
    }),
  ],

  devServer: {
    disableHostCheck: true,
    stats: 'minimal',
    host: 'localhost',
    port: '8080',
    setup(app) {
      app.get('/api/*', function(req, res) {
        got(`${API_URL}/${req.url.substr(5)}`)
          .then((response) => {
            res.json(response.body);
          })
          .catch(error => {
            res.json({ error });
          });
      });
    },
  },
};
