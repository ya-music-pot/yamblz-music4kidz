import * as PlayerActions from '_actions/playerActionTypes';

export const defaultState = {
  isPlaying: false,
  shouldPlay: false,
  loaded: false,
  isRadio: false,
  isRepeatMode: false,

  cover: '',
  singerName: '',
  trackName: '',
  position: 0,
  trackId: null,
  playlist: [],
  radio: [],
  duration: 0,
  playlistId: null,
};

export default function (state = defaultState, action) {
  const { type, payload, response } = action;


  switch (type) {
    case PlayerActions.PLAYER_START:
      return {
        ...state,
        trackId: payload.trackId,
        position: 0,
        duration: 0,
        shouldPlay: true,
        loaded: false,
      };

    case PlayerActions.PLAYER_RESUME:
      return {
        ...state,
        isPlaying: true,
        shouldPlay: true,
      };

    case PlayerActions.PLAYER_PLAYED:
      return {
        ...state,
        isPlaying: true,
        loaded: true,
      };

    case PlayerActions.PLAYER_STOP:
    case PlayerActions.PLAYER_PAUSE:
      return {
        ...state,
        isPlaying: false,
        shouldPlay: false,
      };

    case PlayerActions.PLAYER_NEXT:
    case PlayerActions.PLAYER_PREV:
      return {
        ...state,
      };

    case PlayerActions.PLAYER_CLEAR:
      return {
        ...defaultState,
      };

    case PlayerActions.PLAYER_SAVE_TRACK:
      return {
        ...state,
        cover: payload.imageUrl,
        singerName: payload.artist,
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

    case PlayerActions.SET_POSITION:
      return {
        ...state,
        ...payload,
      };

    case PlayerActions.SHOW_SELECTOR:
      return {
        ...state,
        isSelector: true,
      };

    case PlayerActions.CLOSE_SELECTOR:
      return {
        ...state,
        isSelector: false,
      };

    case PlayerActions.TOGGLE_REPEAT:
      return {
        ...state,
        isRepeatMode: !state.isRepeatMode,
      };

    case `${PlayerActions.PLAYER_GET_RADIO}_SUCCESS`:
      return {
        ...state,
        playlist: [...state.playlist.slice(-1), response.data],
        radio: [response.data],
      };

    default:
      return state;
  }
}
