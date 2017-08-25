import React from 'react';
import ReactDOM from 'react-dom';
import { AppContainer } from 'react-hot-loader';
import { HashRouter } from 'react-router-dom';

import routes from '_app/routes';

ReactDOM.render((
  <AppContainer>
    <HashRouter>
      { routes }
    </HashRouter>
  </AppContainer>
), document.getElementById('root'));
