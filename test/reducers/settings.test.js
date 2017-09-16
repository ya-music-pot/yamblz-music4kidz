/* eslint-env jest */
import { UPDATE_EMOJI, UPDATE_ACTION, UPDATE_TRACKS } from '_actions/settings';
import { CLEAR_SET_UP } from '_actions/setup';
import settingsReducer, { settingsDefault } from '_reducers/settings';

describe('settings reducer', () => {
  it('should return the initial state', () => {
    expect(settingsReducer(undefined, {})).toEqual(settingsDefault);
  });

  it('should handle UPDATE_EMOJI', () => {
    expect(settingsReducer({}, {
      type: UPDATE_EMOJI,
      payload: {
        moodId: 1,
      },
    })).toEqual({
      moodId: 1,
    });
  });

  it('should handle UPDATE_ACTION', () => {
    expect(settingsReducer({}, {
      type: UPDATE_ACTION,
      payload: {
        actionId: 1,
      },
    })).toEqual({
      actionId: 1,
    });
  });

  it('should handle UPDATE_TRACKS', () => {
    expect(settingsReducer(settingsDefault, {
      type: UPDATE_TRACKS,
      payload: {
        trackId: 1,
        liked: true,
      },
    })).toEqual({
      ...settingsDefault,
      likesCount: 1,
      tracks: [{
        track_id: 1,
        liked: true,
      }],
    });
  });

  it('should handle CLEAR_SET_UP', () => {
    expect(settingsReducer({}, {
      type: CLEAR_SET_UP,
    })).toEqual(settingsDefault);
  });
});

