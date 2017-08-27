import { combineReducers } from 'redux';
import { routerReducer } from 'react-router-redux';

import dictionaries from '_reducers/dictionaries';
import mood from '_reducers/mood';

export default combineReducers({
  routing: routerReducer,
  dictionaries,
  mood,
});
