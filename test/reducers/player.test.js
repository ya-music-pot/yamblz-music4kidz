/* eslint-env jest */
import * as PlayerActions from '_actions/playerActionTypes';
import playerReducer, { defaultState } from '_reducers/player';

describe('player reducer', () => {
  it('should return the initial state', () => {
    expect(playerReducer(undefined, {})).toEqual(defaultState);
  });

  it('should handle PLAYER_START', () => {
    expect(playerReducer({}, {
      type: PlayerActions.PLAYER_START,
      payload: {
        trackId: 1,
      },
    })).toEqual({
      trackId: 1,
      position: 0,
      duration: 0,
      shouldPlay: true,
      loaded: false,
    });
  });

  it('should handle PLAYER_PLAYED', () => {
    expect(playerReducer({}, {
      type: PlayerActions.PLAYER_PLAYED,
    })).toEqual({
      isPlaying: true,
      loaded: true,
    });
  });

  it('should handle PLAYER_STOP', () => {
    expect(playerReducer({}, {
      type: PlayerActions.PLAYER_STOP,
    })).toEqual({
      isPlaying: false,
      shouldPlay: false,
    });
  });

  it('should handle PLAYER_PAUSE', () => {
    expect(playerReducer({}, {
      type: PlayerActions.PLAYER_PAUSE,
    })).toEqual({
      isPlaying: false,
      shouldPlay: false,
    });
  });

  it('should handle PLAYER_NEXT', () => {
    expect(playerReducer(defaultState, {
      type: PlayerActions.PLAYER_NEXT,
    })).toEqual(defaultState);
  });

  it('should handle PLAYER_PREV', () => {
    expect(playerReducer(defaultState, {
      type: PlayerActions.PLAYER_PREV,
    })).toEqual(defaultState);
  });

  it('should handle PLAYER_CLEAR', () => {
    expect(playerReducer(defaultState, {
      type: PlayerActions.PLAYER_CLEAR,
    })).toEqual(defaultState);
  });

  it('should handle PLAYER_SAVE_TRACK', () => {
    expect(playerReducer({}, {
      type: PlayerActions.PLAYER_SAVE_TRACK,
      payload: {
        imageUrl: 'http://image.com/picture.jpg',
        artist: 'Егор Крид',
      },
    })).toEqual({
      cover: 'http://image.com/picture.jpg',
      singerName: 'Егор Крид',
    });
  });

  it('should handle PLAYER_PROGRESS', () => {
    expect(playerReducer({}, {
      type: PlayerActions.PLAYER_PROGRESS,
      payload: {
        position: 150,
        duration: 1500,
      },
    })).toEqual({
      position: 150,
      duration: 1500,
    });
  });

  it('should handle PLAYER_ENDED', () => {
    expect(playerReducer({}, {
      type: PlayerActions.PLAYER_ENDED,
    })).toEqual({
      isPlaying: false,
    });
  });

  it('should handle SET_TRACK_INFO', () => {
    expect(playerReducer(defaultState, {
      type: PlayerActions.SET_TRACK_INFO,
    })).toEqual(defaultState);
  });

  it('should handle SET_PLAYLIST', () => {
    expect(playerReducer(defaultState, {
      type: PlayerActions.SET_PLAYLIST,
    })).toEqual(defaultState);
  });

  it('should handle SET_POSITION', () => {
    expect(playerReducer(defaultState, {
      type: PlayerActions.SET_POSITION,
    })).toEqual(defaultState);
  });

  it('should handle SHOW_SELECTOR', () => {
    expect(playerReducer({}, {
      type: PlayerActions.SHOW_SELECTOR,
    })).toEqual({
      isSelector: true,
    });
  });

  it('should handle CLOSE_SELECTOR', () => {
    expect(playerReducer({}, {
      type: PlayerActions.CLOSE_SELECTOR,
    })).toEqual({
      isSelector: false,
    });
  });

  it('should handle TOGGLE_REPEAT', () => {
    expect(playerReducer({
      isRepeatMode: true,
    }, {
      type: PlayerActions.TOGGLE_REPEAT,
    })).toEqual({
      isRepeatMode: false,
    });
  });

  it('should handle PLAYER_GET_RADIO', () => {
    expect(playerReducer({
      playlist: [1, 2, 3, 4, 5],
    }, {
      type: `${PlayerActions.PLAYER_GET_RADIO}_SUCCESS`,
      response: {
        data: 6,
      },
    })).toEqual({
      playlist: [5, 6],
      radio: [6],
    });
  });
});

