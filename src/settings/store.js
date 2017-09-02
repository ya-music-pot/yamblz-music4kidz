import { createStore, applyMiddleware, compose } from 'redux';
import reducer from '_app/reducers';

import api from '_middlewares/api';
import helpers from '_middlewares/helpers';

const devTools =
  typeof window === 'object' &&
  !isProduction &&
  window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ ||
  compose;

const enhancer = devTools(
  applyMiddleware(
    api,
    helpers,
  ),
);

const state = {};

export default createStore(reducer, state, enhancer);
