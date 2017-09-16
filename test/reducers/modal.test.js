/* eslint-env jest */
import { MODAL_OPEN, MODAL_CLOSE } from '_actions/modal';
import modalReducer from '_reducers/modal';

describe('modal reducer', () => {
  it('should return the initial state', () => {
    expect(modalReducer(undefined, {})).toEqual({});
  });

  it('should handle GET_FEED_START', () => {
    expect(modalReducer({}, {
      type: MODAL_OPEN,
      payload: {
        name: 'listTracks',
        data: {
          title: 'Список треков',
        },
      },
    })).toEqual({
      listTracks: {
        title: 'Список треков',
      },
    });
  });

  it('should handle MODAL_CLOSE', () => {
    expect(modalReducer({
      listTracks: {
        title: 'Список треков',
      },
    }, { type: MODAL_CLOSE })).toEqual({});
  });
});

