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

export function playerClear() {
  return {
    type: ActionType.PLAYER_CLEAR,
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

export function likeTrack(id, trackId) {
  return {
    type: ActionType.LIKE_TRACK,
    callAPI: {
      method: 'POST',
      url: `${API_URL}user/${id}/like_track?track_id=${trackId}&liked=true`,
    },
  };
}

export function dislikeTrack(id, trackId) {
  return {
    type: ActionType.DISLIKE_TRACK,
    callAPI: {
      method: 'POST',
      url: `${API_URL}user/${id}/like_track?track_id=${trackId}&liked=false`,
    },
  };
}

export function setPlaylist(playlist, isRadio, playlistId) {
  return {
    type: ActionType.SET_PLAYLIST,
    player: {
      isRadio,
    },
    payload: {
      playlist,
      isRadio,
      playlistId,
    },
  };
}

export function setTrackInfo(payload) {
  return {
    type: ActionType.SET_TRACK_INFO,
    payload,
  };
}

export function toggleRepeatMode() {
  return {
    type: ActionType.TOGGLE_REPEAT,
  };
}

export function setPosition(position) {
  return {
    type: ActionType.SET_POSITION,
    player: {},
    payload: {
      position,
    },
  };
}

export function showSelector(isSelector) {
  return {
    type: ActionType.SHOW_SELECTOR,
    player: {
      isSelector,
    },
  };
}

export function closeSelector(isSelector) {
  return {
    type: ActionType.CLOSE_SELECTOR,
    player: {
      isSelector,
    },
  };
}

export function getRadio(id) {
  return {
    type: ActionType.PLAYER_GET_RADIO,
    callAPI: {
      url: `${API_URL}user/${id}/radio`,
    },
  };
}
