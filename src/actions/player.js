import * as ActionType from './playerActionTypes.js';

export function playerPlay(trackId) {
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

export function playerNext(currentTrackId) {
  return {
    type: ActionType.PLAYER_NEXT,
    player: {
      trackId: currentTrackId,
    },
  };
}

export function playerPrev(currentTrackId) {
  return {
    type: ActionType.PLAYER_PREV,
    player: {
      trackId: currentTrackId,
    },
  };
}

export function setPlaylist(playlist, isRadio) {
  return {
    type: ActionType.SET_PLAYLIST,
    player: {
      isRadio,
    },
    payload: {
      playlist,
      isRadio,
    },
  };
}

export function toggleRepeatMode() {
  return {
    type: ActionType.TOGGLE_REPEAT,
  };
}
