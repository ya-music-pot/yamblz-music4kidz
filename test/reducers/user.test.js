/* eslint-env jest */
import {
  GET_USER, UPDATE_USER, GET_ALL_TRACKS,
  GET_ALL_PLAYLISTS, GET_ACHIEVEMENTS,
  CREATE_USER, ADD_PLAYLIST, DELETE_PLAYLIST,
  ADD_USER_TRACK, DELETE_USER_TRACK,
} from '_actions/user';
import userReducer, { defaultState } from '_reducers/user';

describe('user reducer', () => {
  it('should return the initial state', () => {
    expect(userReducer(undefined, {})).toEqual(defaultState);
  });

  it('should handle GET_USER_SUCCESS', () => {
    expect(userReducer({}, {
      type: `${GET_USER}_SUCCESS`,
      response: {
        data: {
          id: 1,
        },
      },
    })).toEqual({
      loading: false,
      loaded: true,
      data: {
        id: 1,
      },
    });
  });

  it('should handle UPDATE_USER_START', () => {
    expect(userReducer({}, {
      type: `${UPDATE_USER}_START`,
    })).toEqual({
      loading: true,
      loaded: false,
    });
  });

  it('should handle UPDATE_USER_FAIL', () => {
    expect(userReducer({}, {
      type: `${UPDATE_USER}_FAIL`,
    })).toEqual({
      loading: false,
      loaded: true,
    });
  });

  it('should handle UPDATE_USER_SUCCESS', () => {
    expect(userReducer({}, {
      type: `${UPDATE_USER}_SUCCESS`,
      response: {
        data: {
          mood: 1,
        },
      },
    })).toEqual({
      loading: false,
      loaded: true,
      data: {
        mood: 1,
      },
    });
  });

  it('should handle CREATE_USER_START', () => {
    expect(userReducer({}, {
      type: `${CREATE_USER}_START`,
    })).toEqual({
      loading: true,
      loaded: false,
    });
  });

  it('should handle CREATE_USER_FAIL', () => {
    expect(userReducer({}, {
      type: `${CREATE_USER}_FAIL`,
    })).toEqual({
      loading: false,
      loaded: true,
    });
  });

  it('should handle CREATE_USER_SUCCESS', () => {
    expect(userReducer({}, {
      type: `${CREATE_USER}_SUCCESS`,
      response: {
        data: {
          id: 1,
        },
      },
    })).toEqual({
      loading: false,
      loaded: true,
      data: {
        id: 1,
      },
    });
  });

  it('should handle GET_ALL_TRACKS_START', () => {
    expect(userReducer({}, {
      type: `${GET_ALL_TRACKS}_START`,
    })).toEqual({
      loading: true,
      loaded: false,
    });
  });

  it('should handle GET_ALL_TRACKS_FAIL', () => {
    expect(userReducer({}, {
      type: `${GET_ALL_TRACKS}_FAIL`,
    })).toEqual({
      loading: false,
      loaded: true,
    });
  });

  it('should handle GET_ALL_TRACKS_SUCCESS', () => {
    expect(userReducer({}, {
      type: `${GET_ALL_TRACKS}_SUCCESS`,
      response: {
        data: [1, 2, 3],
      },
    })).toEqual({
      loading: false,
      loaded: true,
      tracks: [1, 2, 3],
    });
  });

  it('should handle GET_ALL_PLAYLISTS_START', () => {
    expect(userReducer({}, {
      type: `${GET_ALL_PLAYLISTS}_START`,
    })).toEqual({
      loading: true,
      loaded: false,
    });
  });

  it('should handle GET_ALL_PLAYLISTS_FAIL', () => {
    expect(userReducer({}, {
      type: `${GET_ALL_PLAYLISTS}_FAIL`,
    })).toEqual({
      loading: false,
      loaded: true,
    });
  });

  it('should handle GET_ALL_PLAYLISTS_SUCCESS', () => {
    expect(userReducer({}, {
      type: `${GET_ALL_PLAYLISTS}_SUCCESS`,
      response: {
        data: [1, 2, 3],
      },
    })).toEqual({
      loading: false,
      loaded: true,
      playlists: [1, 2, 3],
    });
  });

  it('should handle GET_ACHIEVEMENTS_SUCCESS', () => {
    expect(userReducer({}, {
      type: `${GET_ACHIEVEMENTS}_SUCCESS`,
      response: {
        data: [1, 2, 3],
      },
    })).toEqual({
      loading: false,
      loaded: true,
      achievements: [1, 2, 3],
    });
  });

  it('should handle ADD_PLAYLIST', () => {
    expect(userReducer(defaultState, {
      type: ADD_PLAYLIST,
      payload: {
        playlist: 1,
      },
    })).toEqual({
      ...defaultState,
      playlists: [1],
    });
  });

  it('should handle DELETE_PLAYLIST', () => {
    expect(userReducer({
      ...defaultState,
      playlists: [{
        id: 1,
      }, {
        id: 2,
      }],
    }, {
      type: DELETE_PLAYLIST,
      payload: {
        playlist: {
          id: 1,
        },
      },
    })).toEqual({
      ...defaultState,
      playlists: [{
        id: 2,
      }],
    });
  });

  it('should handle ADD_USER_TRACK', () => {
    expect(userReducer(defaultState, {
      type: ADD_USER_TRACK,
      payload: {
        track: 1,
      },
    })).toEqual({
      ...defaultState,
      tracks: [1],
    });
  });

  it('should handle DELETE_USER_TRACK', () => {
    expect(userReducer({
      ...defaultState,
      tracks: [{
        id: 1,
      }, {
        id: 2,
      }],
    }, {
      type: DELETE_USER_TRACK,
      payload: {
        trackId: 1,
      },
    })).toEqual({
      ...defaultState,
      tracks: [{
        id: 2,
      }],
    });
  });
});

