import * as PlayerActions from '_actions/playerActionTypes.js';
import playerState from '_data/player';

export default function (state = playerState, action) {
  const { type, payload, response } = action;

  switch (type) {
    case PlayerActions.PLAYER_START:
      return {
        ...state,
        isPlaying: true,
        trackId: payload.trackId,
        position: 0,
        duration: 0,
      };

    case PlayerActions.PLAYER_RESUME:
      return {
        ...state,
        isPlaying: true,
      };

    case PlayerActions.PLAYER_STOP:
    case PlayerActions.PLAYER_PAUSE:
      return {
        ...state,
        isPlaying: false,
      };

    case PlayerActions.PLAYER_PROGRESS:
      return {
        ...state,
        position: payload.position,
        duration: payload.duration,
      };
    case PlayerActions.PLAYER_ENDED:
      return {
        ...state,
        isPlaying: false,
      };

    case PlayerActions.SET_TRACK_INFO:
      return {
        ...state,
        ...payload,
      };

    case PlayerActions.SET_PLAYLIST:
      return {
        ...state,
        ...payload,
      };

    case PlayerActions.TOGGLE_REPEAT:
      return {
        ...state,
        isRepeatMode: !state.isRepeatMode,
      };

    case `${PlayerActions.PLAYER_GET_RADIO}_SUCCESS`:
      return {
        ...state,
        playlist: [...state.playlist, response.data],
      };

    default:
      return state;
  }
}
