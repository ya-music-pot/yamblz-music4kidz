import * as ActionType from './playerActionTypes.js';

export function playerStart(trackId) {
  return {
    type: ActionType.PLAYER_START,
    player: {
      trackId,
    },
  };
}

export function playerStop() {
  return {
    type: ActionType.PLAYER_STOP,
  };
}

export function playerPause() {
  return {
    type: ActionType.PLAYER_PAUSE,
  };
}

export function playerResume() {
  return {
    type: ActionType.PLAYER_RESUME,
  };
}
