/* eslint-env jest */
import {
  PLAYER_INITED, PLAYER_MODE_UPDATE, SHOW_PLAYER,
  SET_INFO_CARD, playerInit, playerModeUpdate,
  showPlayer, setInfoCard,
} from '_actions/playerInfo';

describe('playerInfo action', () => {

  it('should return PLAYER_INITED action', () => {
    expect(playerInit()).toEqual({
      type: PLAYER_INITED,
    });
  });

  it('should return PLAYER_MODE_UPDATE action', () => {
    expect(playerModeUpdate('full')).toEqual({
      type: PLAYER_MODE_UPDATE,
      payload: {
        mode: 'full',
      },
    });
  });

  it('should return SHOW_PLAYER action', () => {
    expect(showPlayer(2, 'Привет, Андрей, привет, Андрей')).toEqual({
      type: SHOW_PLAYER,
      payload: {
        cardType: 2,
        cardTitle: 'Привет, Андрей, привет, Андрей',
      },
    });
  });

  it('should return SET_INFO_CARD action', () => {
    expect(setInfoCard(5, 'Привет, Андрей, ну где ты был')).toEqual({
      type: SET_INFO_CARD,
      payload: {
        cardType: 5,
        cardTitle: 'Привет, Андрей, ну где ты был',
      },
    });
  });

});

