import * as PlayerActions from '_actions/playerActionTypes.js';
import playerState from '_data/player';

export default function (state = playerState, action) {
  const { type } = action;

  switch (type) {
    case PlayerActions.PLAYER_START:
      return {
        ...state,
        isPlaying: true,
      };
    case PlayerActions.PLAYER_STOP:
      return {
        ...state,
        isPlaying: false,
      };
    default:
      return state;
  }
}
