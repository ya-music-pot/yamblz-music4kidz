const express = require('express');
const got = require('got');

const webpack = require('webpack');
const webpackDevMiddleware = require('webpack-dev-middleware');
const webpackHotMiddleware = require('webpack-hot-middleware');
const webpackConfig = require('./webpack.config.js');

const app = express();
const path = require('path');

const compiler = webpack(webpackConfig);

app.use('/dist', express.static(`${__dirname}/dist`));

app.use(webpackDevMiddleware(compiler, {
  publicPath: webpackConfig.output.publicPath,
  noInfo: true,
  stats: {
    colors: true,
  },
}));

app.use(webpackHotMiddleware(compiler));

app.get('/', (req, res) => {
  res.sendFile(path.join(`${__dirname}/index.html`));
});

app.get('/playlist', (req, res) => {
  got('https://musicforchildren.herokuapp.com/playlist')
    .then(response => {
      console.log(response.body);
      res.json(response.body);
    })
    .catch(error => {
      console.log(error.response.body);
      //=> 'Internal server error ...'
    });


});

app.listen(8080, () => console.log('listening on 8080'));
