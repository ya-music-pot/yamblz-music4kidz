import * as ActionType from './playerActionTypes.js';

export function playerStart(trackId) {
  return {
    type: ActionType.PLAYER_START,
    player: {
      trackId,
    },
    payload: {
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

export function setPlaylistId(playlistId) {
  return {
    type: ActionType.SET_PLAYLISTID,
    payload: {
      playlistId,
    },
  };
}
