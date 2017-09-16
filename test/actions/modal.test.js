/* eslint-env jest */
import {
  MODAL_OPEN, MODAL_CLOSE,
  openModal, closeModal,
} from '_actions/modal';

describe('modal action', () => {
  it('should return MODAL_OPEN action', () => {
    const data = {
      title: 'Я никогда не была твоей',
    };

    expect(openModal('modal', data)).toEqual({
      type: MODAL_OPEN,
      payload: {
        name: 'modal',
        data,
      },
    });
  });

  it('should return MODAL_CLOSE action', () => {
    expect(closeModal()).toEqual({
      type: MODAL_CLOSE,
    });
  });
});
