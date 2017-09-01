import { combineReducers } from 'redux';

import dictionaries from '_reducers/dictionaries';
import settings from '_reducers/settings';
import setup from '_reducers/setup';
import user from '_reducers/user';

export default combineReducers({
  dictionaries,
  settings,
  setup,
  user,
});
