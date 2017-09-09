import { MODAL_OPEN, MODAL_CLOSE } from '_actions/modal';

export default function (state = {}, action) {
  const { type, payload } = action;

  switch (type) {
    case MODAL_OPEN:
      return {
        ...state,
        [payload.name]: true,
      };
    case MODAL_CLOSE:
      return {
        ...state,
        [payload.name]: false,
      };
    default:
      return state;
  }
}
