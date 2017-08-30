import { combineReducers } from 'redux';

import dictionaries from '_reducers/dictionaries';
import settings from '_reducers/settings';
import setup from '_reducers/setup';

export default combineReducers({
  dictionaries,
  settings,
  setup,
});
