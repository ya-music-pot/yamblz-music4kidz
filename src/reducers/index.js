import { combineReducers } from 'redux';
import { routerReducer } from 'react-router-redux';

import mood from '_reducers/mood';

export default combineReducers({
  routing: routerReducer,
  mood,
});
