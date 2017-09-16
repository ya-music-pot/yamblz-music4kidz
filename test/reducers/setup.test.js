/* eslint-env jest */
import { UPDATE_STEP, CLEAR_SET_UP } from '_actions/setup';
import setupReducer, { stateDefault } from '_reducers/setup';

describe('setup reducer', () => {
  it('should return the initial state', () => {
    expect(setupReducer(undefined, {})).toEqual(stateDefault);
  });

  it('should handle UPDATE_STEP', () => {
    expect(setupReducer({}, {
      type: UPDATE_STEP,
      payload: {
        newStep: 1,
      },
    })).toEqual({
      activeStep: 1,
    });
  });

  it('should handle CLEAR_SET_UP', () => {
    expect(setupReducer({}, {
      type: CLEAR_SET_UP,
    })).toEqual(stateDefault);
  });
});

