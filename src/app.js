import React from 'react';
import ReactDOM from 'react-dom';
import { AppContainer } from 'react-hot-loader';
import { Router } from 'react-router';
import { Provider } from 'react-redux';

import store from '_settings/store';
import routes from '_settings/routes';
import history from '_settings/history';

import '_settings/main.css';

ReactDOM.render((
  <AppContainer>
    <Provider store={store}>
      <Router history={history}>
        { routes }
      </Router>
    </Provider>
  </AppContainer>
), document.getElementById('root'));
