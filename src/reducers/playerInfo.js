import {
  PLAYER_INITED, PLAYER_MODE_UPDATE, SHOW_PLAYER,
  SET_INFO_CARD,
} from '_actions/playerInfo';

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
        ...payload,
      };

    case SET_INFO_CARD:
      return {
        ...state,
        ...payload,
      };

    default:
      return state;
  }
}
