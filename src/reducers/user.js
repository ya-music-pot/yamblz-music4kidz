import { GET_USER } from '_actions/user';

export default function (state = {}, action) {
  const { type, response } = action;

  switch (type) {
    case `${GET_USER}_START`:
      return {
        ...state,
        loading: true,
        loaded: false,
      };
    case `${GET_USER}_FAIL`:
      return {
        ...state,
        loading: false,
        loaded: true,
      };
    case `${GET_USER}_SUCCESS`:
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
