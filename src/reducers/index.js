import { combineReducers } from 'redux';

import dictionaries from '_reducers/dictionaries';
import playerInfo from '_reducers/playerInfo';
import settings from '_reducers/settings';
import player from '_reducers/player';
import feed from '_reducers/feed';
import setup from '_reducers/setup';
import user from '_reducers/user';

export default combineReducers({
  dictionaries,
  settings,
  playerInfo,
  player,
  feed,
  setup,
  user,
});
