import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import initReactFastclick from 'react-fastclick';

import { hashHistory, Router } from 'react-router';
import store from '_settings/store';
import routes from '_settings/routes';

// import Player

import '_settings/main.css';

initReactFastclick();

//initPlayer

ReactDOM.render((
  <Provider store={store}>
    <Router history={hashHistory}>
      { routes }
    </Router>
  </Provider>
), document.getElementById('root'));
