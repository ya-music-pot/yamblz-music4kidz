import { NEW_ERROR } from '_actions/errors';

export default function (state = {}, action) {
  const { type, payload } = action;

  switch (type) {
    case NEW_ERROR:
      return {
        ...state,
        status: payload.status,
      };
    default:
      return state;
  }
}
