import { playerStop, playerClear } from '_actions/player';
import { playerModeUpdate } from '_actions/playerInfo';

import store from '_settings/store';

export function removePlayerPage() {
  store.dispatch(playerModeUpdate(''));
  store.dispatch(playerStop());
  store.dispatch(playerClear());
}
