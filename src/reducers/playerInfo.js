import { PLAYER_INITED, PLAYER_MODE_UPDATE } from '_actions/playerInfo.js';

const defaultState = {
  inited: false,
  mode: 'full',
};

export default function (state = defaultState, action) {
  const { type, payload } = action;

  switch (type) {
    case PLAYER_INITED:
      return {
        ...state,
        inited: true,
      };

    case PLAYER_MODE_UPDATE:
      return {
        ...state,
        mode: payload.mode,
      };

    default:
      return state;
  }
}
