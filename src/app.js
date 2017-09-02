import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import initReactFastclick from 'react-fastclick';

import { hashHistory, Router } from 'react-router';
import store from '_settings/store';
import routes from '_settings/routes';

import { getUser } from '_actions/user';
import { getFeed } from '_actions/feed';

import '_settings/main.styl';

initReactFastclick();

const userId = 1;
store.dispatch(getUser(userId));
store.dispatch(getFeed(userId));

ReactDOM.render((
  <Provider store={store}>
    <Router history={hashHistory}>
      { routes }
    </Router>
  </Provider>
), document.getElementById('root'));

