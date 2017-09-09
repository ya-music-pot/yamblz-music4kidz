import { GET_PROMO } from '_actions/promo';
import data from '_data/promo';

export default function (state = { data }, action) {
  const { type, response } = action;

  switch (type) {
    case `${GET_PROMO}_START`:
      return {
        ...state,
        loading: true,
        loaded: false,
      };
    case `${GET_PROMO}_FAIL`:
      return {
        ...state,
        loading: false,
        loaded: true,
      };
    case `${GET_PROMO}_SUCCESS`:
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
