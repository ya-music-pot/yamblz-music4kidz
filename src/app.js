import React from 'react';
import ReactDOM from 'react-dom';
import { AppContainer } from 'react-hot-loader';
import { Router } from 'react-router';
import { Provider } from 'react-redux';

import store from '_app/store';
import routes from '_app/routes';
import history from '_app/history';


ReactDOM.render((
  <AppContainer>
    <Provider store={store}>
      <Router history={history}>
        { routes }
      </Router>
    </Provider>
  </AppContainer>
), document.getElementById('root'));
