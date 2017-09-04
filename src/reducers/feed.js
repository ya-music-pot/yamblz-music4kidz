import { GET_FEED } from '_actions/feed';

export default function (state = {}, action) {
  const { type, response } = action;

  switch (type) {
    case `${GET_FEED}_START`:
      return {
        ...state,
        loading: true,
        loaded: false,
      };
    case `${GET_FEED}_FAIL`:
      return {
        ...state,
        loading: false,
        loaded: true,
      };
    case `${GET_FEED}_SUCCESS`:
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
