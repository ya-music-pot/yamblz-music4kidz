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
import { AUDIO_PLAYER_ERROR, errorHandling, AppError } from '_helpers/errors';

import '_settings/global.css';

initReactFastclick();


/* Render */
loadCommonData().then(render).catch((error) => {
  render();
  errorHandling(error);
});

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


/*
  Helpers
 */

/* SVG */
const __svg__ = {
  path: '../assets/images/icons/**/*.svg',
  name: '[hash].logos.svg',
};

/**
 * @return {Promise}
 */
function loadCommonData() {
  const { authToken } = getLocalStorage();

  return Promise.all([
    authToken ? store.dispatch(getUser(authToken)) : Promise.resolve(),
    initAudio(),
    loaderSvg(__svg__),
  ]);
}

/**
 * initAudio
 * @return {Promise}
 */
function initAudio() {
  return AudioPlayer.init().then(() => {
    playerListeners();
    store.dispatch(playerInit());
  }, () => {
    throw new AppError(
      AUDIO_PLAYER_ERROR,
      { message: 'Не удалось инициализировать аудио-плеер' },
    );
  });
}
