/* eslint-env jest */
import { NEW_ERROR } from '_actions/errors';
import errorReducer from '_reducers/errors';

describe('error reducer', () => {
  it('should return the initial state', () => {
    expect(errorReducer(undefined, {})).toEqual({});
  });

  it('should handle NEW_ERROR', () => {
    expect(errorReducer({}, {
      type: NEW_ERROR,
      payload: {
        status: 500,
      },
    })).toEqual({
      status: 500,
    });
  });
});

