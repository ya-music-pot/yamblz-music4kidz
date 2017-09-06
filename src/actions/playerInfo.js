export const PLAYER_INITED = 'PLAYER_INITED';
export const PLAYER_MODE_UPDATE = 'PLAYER_MODE_UPDATE';

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
