import { combineReducers } from 'redux';

import dictionaries from '_reducers/dictionaries';
import settings from '_reducers/settings';
import playlist from '_reducers/playlist';
import player from '_reducers/player';
import setup from '_reducers/setup';
import tracks from '_reducers/tracks';
import user from '_reducers/user';

export default combineReducers({
  dictionaries,
  settings,
  playlist,
  player,
  setup,
  tracks,
  user,
});
