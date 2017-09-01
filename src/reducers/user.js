import { GET_USER } from '_actions/settings';

export default function (state = {}, action) {
  const { type } = action;

  switch (type) {
    case GET_USER:
      return {
        ...state,
      };
    default:
      return state;
  }
}
