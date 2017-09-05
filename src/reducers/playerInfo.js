import { PLAYER_INITED } from '_actions/playerInfo.js';

const defaultState = {
  inited: false,
};

export default function (state = defaultState, action) {
  const { type } = action;

  switch (type) {
    case PLAYER_INITED:
      return {
        ...state,
        inited: true,
      };

    default:
      return state;
  }
}
