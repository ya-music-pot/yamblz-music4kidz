import React from 'react';
import ReactDOM from 'react-dom';
import { Router } from 'react-router';
import { Provider } from 'react-redux';
import initReactFastclick from 'react-fastclick';

import store from '_settings/store';
import routes from '_settings/routes';

import { playerInit } from '_actions/playerInfo';

import history from '_settings/history';

import AudioPlayer from '_helpers/AudioPlayer';
import playerListeners from '_helpers/playerListeners';
import loaderSvg from '_helpers/svgLoad';

import { getUser } from '_actions/user';
import { getLocalStorage } from '_helpers';

import '_settings/global.css';

initReactFastclick();

/* Player */
AudioPlayer.init().then(() => {
  playerListeners();
  store.dispatch(playerInit());
}, () => {
  throw Error('Не удалось инициализировать аудио-плеер');
});

/* SVG */
const __svg__ = {
  path: '../assets/images/icons/**/*.svg',
  name: '[hash].logos.svg',
};


/* Render */
const { authToken } = getLocalStorage();
if (authToken) {
  store.dispatch(getUser(authToken))
    .then(() => loaderSvg(__svg__))
    .then(render)
    .catch(() => {
      loadDataAndRender();
      throw Error('Ошибка первоначальной загрузки данных!');
    });
} else {
  loadDataAndRender();
}

function render() {
  ReactDOM.render((
    <div>
      <Provider store={store}>
        <Router history={history}>
          { routes }
        </Router>
      </Provider>
    </div>
  ), document.getElementById('root'));
}

/**
 * @return {Promise}
 */
function loadDataAndRender() {
  return loaderSvg(__svg__).then(render).catch(() => {
    render();
    throw Error('Ошибка загрузки!');
  });
}
