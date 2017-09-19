export const PLAYER_INITED = 'PLAYER_INITED';
export const PLAYER_MODE_UPDATE = 'PLAYER_MODE_UPDATE';
export const SHOW_PLAYER = 'SHOW_PLAYER';
export const SET_INFO_CARD = 'SET_INFO_CARD';

export function playerInit() {
  return {
    type: PLAYER_INITED,
  };
}

export function playerModeUpdate(mode) {
  return {
    type: PLAYER_MODE_UPDATE,
    payload: {
      mode,
    },
  };
}

export function showPlayer(cardType, cardTitle) {
  return {
    type: SHOW_PLAYER,
    payload: {
      cardType,
      cardTitle,
    },
  };
}

export function setInfoCard(data) {
  return {
    type: SET_INFO_CARD,
    payload: {
      ...data,
    },
  };
}
