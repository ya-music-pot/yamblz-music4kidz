/* eslint-env jest */
import {
  UPDATE_STEP, CLEAR_SET_UP,
  updateStep, clearSetUp,
} from '_actions/setup';

describe('setup action', () => {
  it('should return UPDATE_STEP action', () => {
    expect(updateStep(2)).toEqual({
      type: UPDATE_STEP,
      payload: { newStep: 2 },
    });
  });

  it('should return CLEAR_SET_UP action', () => {
    expect(clearSetUp()).toEqual({
      type: CLEAR_SET_UP,
    });
  });
});
