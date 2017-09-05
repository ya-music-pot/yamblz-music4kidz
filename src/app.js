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
import addPlayerListeners from '_settings/playerListeners';

import '_settings/main.styl';

initReactFastclick();

AudioPlayer.init();
addPlayerListeners(store.dispatch, store.getState);

const userId = 1;
store.dispatch(getUser(userId));
store.dispatch(getFeed(userId));

ReactDOM.render((
  <div>
    <Provider store={store}>
      <Router history={history}>
        { routes }
      </Router>
    </Provider>
  </div>
), document.getElementById('root'));
