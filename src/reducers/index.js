import { combineReducers } from 'redux';
import { routerReducer } from 'react-router-redux';

import dictionaries from '_reducers/dictionaries';
import settings from '_reducers/settings';
import setup from '_reducers/setup';

export default combineReducers({
  routing: routerReducer,
  dictionaries,
  settings,
  setup,
});
