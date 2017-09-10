import {
  GET_USER, UPDATE_USER, GET_ALL_TRACKS,
  GET_ALL_PLAYLISTS, GET_ACHIEVEMENTS,
} from '_actions/user';

const defaultState = {
  loading: false,
  loaded: false,
  data: {
    id: 1,
  },
  tracks: [],
  playlists: [],
  achievements: [],
};

export default function (state = { ...defaultState }, action) {
  const { type, response } = action;

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

    default:
      return state;
  }
}
