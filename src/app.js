import React from 'react';
import ReactDOM from 'react-dom';
import { hashHistory, Router } from 'react-router';
import { Provider } from 'react-redux';
import initReactFastclick from 'react-fastclick';

import store from '_settings/store';
import routes from '_settings/routes';
import { getUser } from '_actions/user';
import { getPlaylist } from '_actions/playlist';

import AudioPlayer from '_helpers/AudioPlayer';

import '_settings/main.css';

initReactFastclick();
AudioPlayer.init();

// store.dispatch(getUser(1));
// store.dispatch(getPlaylist());

ReactDOM.render((
  <Provider store={store}>
    <Router history={hashHistory}>
      { routes }
    </Router>
  </Provider>
), document.getElementById('root'));

