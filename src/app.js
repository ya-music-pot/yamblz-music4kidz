import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import initReactFastclick from 'react-fastclick';

import { hashHistory, Router } from 'react-router';
import store from '_settings/store';
import routes from '_settings/routes';

import { getUser } from '_actions/user';
import { getPlaylist } from '_actions/playlist';

import '_settings/main.styl';

initReactFastclick();

store.dispatch(getUser(1));
store.dispatch(getPlaylist());

ReactDOM.render((
  <Provider store={store}>
    <Router history={hashHistory}>
      { routes }
    </Router>
  </Provider>
), document.getElementById('root'));

