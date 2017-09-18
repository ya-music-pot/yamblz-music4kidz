/* eslint-env jest */
import { NEW_ERROR, saveError } from '_actions/errors';

describe('error action', () => {
  it('should return NEW_ERROR action', () => {
    expect(saveError('404')).toEqual({
      type: NEW_ERROR,
      payload: { status: '404' },
    });
  });
});
