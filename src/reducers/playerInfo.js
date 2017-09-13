import { PLAYER_INITED, PLAYER_MODE_UPDATE, SHOW_PLAYER } from '_actions/playerInfo.js';

const defaultState = {
  inited: false,
  isShow: false,
  mode: '',
  cardType: null,
  cardTitle: null,
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

    case SHOW_PLAYER:
      return {
        ...state,
        isShow: true,
        cardType: payload.cardType,
        cardTitle: payload.cardTitle,
      };

    default:
      return state;
  }
}
