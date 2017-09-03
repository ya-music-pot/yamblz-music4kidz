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
    player: {},
  };
}

export function playerPause() {
  return {
    type: ActionType.PLAYER_PAUSE,
    player: {},
  };
}

export function playerResume() {
  return {
    type: ActionType.PLAYER_RESUME,
    player: {},
  };
}

export function setTrackId(trackId) {
  return {
    type: ActionType.SET_TRACKID,
    payload: {
      trackId,
    },
  };
}
