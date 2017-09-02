import { GET_USER, UPDATE_USER } from '_actions/user';

const defaultState = {
  loading: false,
  loaded: false,
  data: {},
};

export default function (state = { ...defaultState }, action) {
  const { type, response } = action;

  switch (type) {
    case `${GET_USER}_SUCCESS`:
      return {
        ...state,
        moveToPlaylist: false,
        loading: false,
        loaded: true,
        ...response,
      };
    case `${UPDATE_USER}_START`:
      return {
        ...state,
        moveToPlaylist: false,
        loading: true,
        loaded: false,
      };
    case `${UPDATE_USER}_FAIL`:
      return {
        ...state,
        moveToPlaylist: false,
        loading: false,
        loaded: true,
      };
    case `${UPDATE_USER}_SUCCESS`:
      return {
        ...state,
        moveToPlaylist: true,
        loading: false,
        loaded: true,
        ...response,
      };
    default:
      return state;
  }
}
