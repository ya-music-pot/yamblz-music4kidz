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
import loaderSvg from '_helpers/svgxhr';

import '_settings/main.styl';

initReactFastclick();

AudioPlayer.init().then(() => {
  console.log('Аудио-плеер готов к работе');
  playerListeners();
  store.dispatch(playerInit());
}, () => {
  console.error('Не удалось инициализировать аудио-плеер');
});

const __svg__ = {
  path: '../assets/images/icons/**/*.svg',
  name: '[hash].logos.svg',
};


ReactDOM.render((
  <div>
    <Provider store={store}>
      <Router history={history}>
        { routes }
      </Router>
    </Provider>
  </div>
), document.getElementById('root'));

loaderSvg(__svg__);

