/* eslint-env jest */
import {
  UPDATE_EMOJI, UPDATE_ACTION, UPDATE_TRACKS,
  saveEmoji, saveAction, saveTracks,
} from '_actions/settings';

describe('settings action', () => {

  it('should return UPDATE_EMOJI action', () => {
    expect(saveEmoji(1)).toEqual({
      type: UPDATE_EMOJI,
      payload: {
        moodId: 1,
      },
    });
  });

  it('should return UPDATE_ACTION action', () => {
    expect(saveAction(2)).toEqual({
      type: UPDATE_ACTION,
      payload: {
        actionId: 2,
      },
    });
  });

  it('should return UPDATE_TRACKS action', () => {
    expect(saveTracks(5, true)).toEqual({
      type: UPDATE_TRACKS,
      payload: {
        trackId: 5,
        liked: true,
      },
    });
  });

});

