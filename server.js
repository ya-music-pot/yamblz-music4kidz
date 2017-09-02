const express = require('express');
const got = require('got');

const webpack = require('webpack');
const webpackDevMiddleware = require('webpack-dev-middleware');
const webpackHotMiddleware = require('webpack-hot-middleware');
const webpackConfig = require('./webpack.config.js');

const app = express();
const path = require('path');

const compiler = webpack(webpackConfig);
const API_URL = 'https://musicforchildren.herokuapp.com/';


app.use('/dist', express.static(`${__dirname}/dist`));
app.use(webpackDevMiddleware(compiler, {
  publicPath: webpackConfig.output.publicPath,
  stats: {
    colors: true,
  },
  // noInfo: true,
}));
app.use(webpackHotMiddleware(compiler));

app.get('/', (req, res) => {
  res.sendFile(path.join(`${__dirname}/index.html`));
});

/*
  Отслеживание всех маршрутов начинающихся с /api
  и прокидывание подурла на необходимый API_URL.
 */
const router = express.Router();
app.use('/api', router);

router.get('*', (req, res) => {
  got(`${API_URL}/${req.url}`)
    .then((response) => {
      res.json(response.body);
    })
    .catch(error => {
      res.json({ error });
    });
});

app.get('*', (req, res) => {
  res.status(404);
  res.json({
    error: 'This page not found',
  });
});

app.listen(8080, () => console.log('listening on 8080'));
