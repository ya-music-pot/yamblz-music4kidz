/* eslint-env jest */
import * as ActionType from '_actions/playerActionTypes';
import * as Player from '_actions/player';

describe('player action', () => {
  global.API_URL = 'https://musicforchildren.herokuapp.com/';
  it('should return PLAYER_START action', () => {
    expect(Player.playerPlay(3)).toEqual({
      type: ActionType.PLAYER_START,
      player: {
        trackId: 3,
      },
      payload: {
        trackId: 3,
      },
    });
  });

  it('should return PLAYER_STOP action', () => {
    expect(Player.playerStop()).toEqual({
      type: ActionType.PLAYER_STOP,
      player: {},
    });
  });

  it('should return PLAYER_PAUSE action', () => {
    expect(Player.playerPause()).toEqual({
      type: ActionType.PLAYER_PAUSE,
      player: {},
    });
  });

  it('should return PLAYER_RESUME action', () => {
    expect(Player.playerResume()).toEqual({
      type: ActionType.PLAYER_RESUME,
      player: {},
    });
  });

  it('should return PLAYER_CLEAR action', () => {
    expect(Player.playerClear()).toEqual({
      type: ActionType.PLAYER_CLEAR,
    });
  });

  it('should return PLAYER_NEXT action', () => {
    expect(Player.playerNext(123456)).toEqual({
      type: ActionType.PLAYER_NEXT,
      player: {
        trackId: 123456,
      },
    });
  });

  it('should return PLAYER_PREV action', () => {
    expect(Player.playerPrev(123456)).toEqual({
      type: ActionType.PLAYER_PREV,
      player: {
        trackId: 123456,
      },
    });
  });

  it('should return LIKE_TRACK action', () => {
    expect(Player.likeTrack(23, 5432)).toEqual({
      type: ActionType.LIKE_TRACK,
      callAPI: {
        method: 'POST',
        url: `${API_URL}user/23/like_track?track_id=5432&liked=true`,
      },
    });
  });

  it('should return DISLIKE_TRACK action', () => {
    expect(Player.dislikeTrack(32, 4680)).toEqual({
      type: ActionType.DISLIKE_TRACK,
      callAPI: {
        method: 'POST',
        url: `${API_URL}user/32/like_track?track_id=4680&liked=false`,
      },
    });
  });

  it('should return ADD_TRACK action', () => {
    expect(Player.addTrack(13, 1313)).toEqual({
      type: ActionType.ADD_TRACK,
      callAPI: {
        method: 'POST',
        url: `${API_URL}user/13/add_track?track_id=1313`,
      },
    });
  });

  it('should return DELETE_TRACK action', () => {
    expect(Player.deleteTrack(54, 5454)).toEqual({
      type: ActionType.DELETE_TRACK,
      callAPI: {
        method: 'DELETE',
        url: `${API_URL}user/54/add_track?track_id=5454`,
      },
    });
  });

  it('should return SET_PLAYLIST action', () => {
    const playlist = {
      name: 'Мы вместе были в кругу друзей',
    };

    expect(Player.setPlaylist(playlist, true, 7)).toEqual({
      type: ActionType.SET_PLAYLIST,
      player: {
        isRadio: true,
      },
      payload: {
        playlist,
        isRadio: true,
        playlistId: 7,
      },
    });
  });

  it('should return SET_TRACK_INFO action', () => {
    const payload = {
      name: 'Ты провожал меня до дверей',
    };

    expect(Player.setTrackInfo(payload)).toEqual({
      type: ActionType.SET_TRACK_INFO,
      payload,
    });
  });

  it('should return TOGGLE_REPEAT action', () => {
    expect(Player.toggleRepeatMode()).toEqual({
      type: ActionType.TOGGLE_REPEAT,
    });
  });

  it('should return SET_POSITION action', () => {
    expect(Player.setPosition(5432)).toEqual({
      type: ActionType.SET_POSITION,
      player: {},
      payload: {
        position: 5432,
      },
    });
  });

  it('should return SHOW_SELECTOR action', () => {
    expect(Player.showSelector(true)).toEqual({
      type: ActionType.SHOW_SELECTOR,
      player: {
        isSelector: true,
      },
    });
  });

  it('should return CLOSE_SELECTOR action', () => {
    expect(Player.closeSelector(false)).toEqual({
      type: ActionType.CLOSE_SELECTOR,
      player: {
        isSelector: false,
      },
    });
  });

  it('should return PLAYER_GET_RADIO action', () => {
    expect(Player.getRadio(12345)).toEqual({
      type: ActionType.PLAYER_GET_RADIO,
      callAPI: {
        url: `${API_URL}user/12345/radio`,
      },
    });
  });

});
