import { GET_PLAYLIST } from '_actions/playlist';

export default function (state = {}, action) {
  const { type, response } = action;

  switch (type) {
    case `${GET_PLAYLIST}_START`:
      return {
        ...state,
        loading: true,
        loaded: false,
      };
    case `${GET_PLAYLIST}_FAIL`:
      return {
        ...state,
        loading: false,
        loaded: true,
      };
    case `${GET_PLAYLIST}_SUCCESS`:
      return {
        ...state,
        loading: false,
        loaded: true,
        ...response,
      };
    default:
      return state;
  }
}
