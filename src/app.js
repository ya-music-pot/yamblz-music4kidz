import React from 'react';
import ReactDOM from 'react-dom';
import { Router } from 'react-router';
import { Provider } from 'react-redux';
import initReactFastclick from 'react-fastclick';

import store from '_settings/store';
import routes from '_settings/routes';

import { getUser } from '_actions/user';
import { getFeed } from '_actions/feed';

import history from '_settings/history';

import AudioPlayer from '_helpers/AudioPlayer';
import playerListeners from '_helpers/playerListeners';

import '_settings/main.styl';

initReactFastclick();

AudioPlayer.init().then(() => {
  console.log('Аудио-плеер готов к работе');
  playerListeners();
}, () => {
  console.error('Не удалось инициализировать аудио-плеер');
});


const userId = 1;
store.dispatch(getUser(userId));
store.dispatch(getFeed(userId));

ReactDOM.render((
  <Provider store={store}>
    <Router history={history}>
      { routes }
    </Router>
  </Provider>
), document.getElementById('root'));
