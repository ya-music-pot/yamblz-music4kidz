import { combineReducers } from 'redux';

import dictionaries from '_reducers/dictionaries';
import settings from '_reducers/settings';

export default combineReducers({
  dictionaries,
  settings,
});
