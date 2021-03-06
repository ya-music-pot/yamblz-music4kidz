import {
  GET_USER, UPDATE_USER, GET_ALL_TRACKS,
  GET_ALL_PLAYLISTS, GET_ACHIEVEMENTS,
  CREATE_USER, ADD_PLAYLIST, DELETE_PLAYLIST,
  ADD_USER_TRACK, DELETE_USER_TRACK,
} from '_actions/user';

export const defaultState = {
  loading: false,
  loaded: false,
  data: {},
  tracks: [],
  playlists: [],
  achievements: [],
};

export default function (state = defaultState, action) {
  const { type, response, payload } = action;

  switch (type) {
    case `${GET_USER}_SUCCESS`:
      return {
        ...state,
        loading: false,
        loaded: true,
        ...response,
      };
    case `${UPDATE_USER}_START`:
      return {
        ...state,
        loading: true,
        loaded: false,
      };
    case `${UPDATE_USER}_FAIL`:
      return {
        ...state,
        loading: false,
        loaded: true,
      };
    case `${UPDATE_USER}_SUCCESS`:
      return {
        ...state,
        loading: false,
        loaded: true,
        ...response,
      };

    case `${CREATE_USER}_START`:
      return {
        ...state,
        loading: true,
        loaded: false,
      };
    case `${CREATE_USER}_FAIL`:
      return {
        ...state,
        loading: false,
        loaded: true,
      };
    case `${CREATE_USER}_SUCCESS`:
      return {
        ...state,
        loading: false,
        loaded: true,
        ...response,
      };

    case `${GET_ALL_TRACKS}_START`:
      return {
        ...state,
        loading: true,
        loaded: false,
      };
    case `${GET_ALL_TRACKS}_FAIL`:
      return {
        ...state,
        loading: false,
        loaded: true,
      };
    case `${GET_ALL_TRACKS}_SUCCESS`:
      return {
        ...state,
        loading: false,
        loaded: true,
        tracks: response.data,
      };

    case `${GET_ALL_PLAYLISTS}_START`:
      return {
        ...state,
        loading: true,
        loaded: false,
      };
    case `${GET_ALL_PLAYLISTS}_FAIL`:
      return {
        ...state,
        loading: false,
        loaded: true,
      };
    case `${GET_ALL_PLAYLISTS}_SUCCESS`:
      return {
        ...state,
        loading: false,
        loaded: true,
        playlists: response.data,
      };

    case `${GET_ACHIEVEMENTS}_SUCCESS`:
      return {
        ...state,
        loading: false,
        loaded: true,
        achievements: response.data,
      };
    case ADD_PLAYLIST:
      return {
        ...state,
        playlists: [...state.playlists, payload.playlist],
      };
    case DELETE_PLAYLIST: {
      const { id } = payload.playlist;
      return {
        ...state,
        playlists: state.playlists.filter((playlist) => (playlist.id !== id)),
      };
    }
    case ADD_USER_TRACK:
      return {
        ...state,
        tracks: [...state.playlists, payload.track],
      };
    case DELETE_USER_TRACK: {
      const { trackId } = payload;
      return {
        ...state,
        tracks: state.tracks.filter((track) => (track.id !== trackId)),
      };
    }
    default:
      return state;
  }
}
