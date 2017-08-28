import { createStore, applyMiddleware, compose } from 'redux';
import { routerMiddleware } from 'react-router-redux';

import history from '_settings/history';
import reducer from '_app/reducers';

import api from '_middlewares/api';

const devTools =
  typeof window === 'object' &&
  !isProduction &&
  window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ ||
  compose;

const routeMiddleware = routerMiddleware(history);
const enhancer = devTools(
  applyMiddleware(
    routeMiddleware,
    api,
  ),
);

const state = {};

export default createStore(reducer, state, enhancer);
