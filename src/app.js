import React from 'react';
import ReactDOM from 'react-dom';
import { Router } from 'react-router';
import { Provider } from 'react-redux';

import store from '_settings/store';
import routes from '_settings/routes';
import history from '_settings/history';

import '_settings/main.css';

ReactDOM.render((

  <Provider store={store}>
    <Router history={history}>
      { routes }
    </Router>
  </Provider>

), document.getElementById('root'));
