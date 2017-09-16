/* eslint-env jest */
import {
  PLAYER_INITED, PLAYER_MODE_UPDATE, SHOW_PLAYER,
  SET_INFO_CARD,
} from '_actions/playerInfo';
import plInfoReducer from '_reducers/playerInfo';

describe('player info reducer', () => {
  it('should return the initial state', () => {
    expect(plInfoReducer(undefined, {})).toEqual({
      inited: false,
      isShow: false,
      mode: '',
      cardType: null,
      cardTitle: null,
    });
  });

  it('should handle PLAYER_INITED', () => {
    expect(plInfoReducer({}, {
      type: PLAYER_INITED,
    })).toEqual({
      inited: true,
    });
  });

  it('should handle PLAYER_INITED', () => {
    expect(plInfoReducer({}, {
      type: PLAYER_MODE_UPDATE,
      payload: {
        mode: 'full',
      },
    })).toEqual({
      mode: 'full',
    });
  });

  it('should handle SHOW_PLAYER', () => {
    expect(plInfoReducer({}, {
      type: SHOW_PLAYER,
    })).toEqual({
      isShow: true,
    });
  });

  it('should handle SET_INFO_CARD', () => {
    expect(plInfoReducer({}, {
      type: SET_INFO_CARD,
      payload: {
        cardType: 1,
        cardTitle: 'Крутая каточка',
      },
    })).toEqual({
      cardType: 1,
      cardTitle: 'Крутая каточка',
    });
  });
});

