export const PLAYER_START = 'PLAYER_START';

export function playerStart() {
  return {
    type: PLAYER_START,
    player: {
      trackId: 432072,
    },
  };
}
