export const MODAL_OPEN = 'MODAL_OPEN';
export const MODAL_CLOSE = 'MODAL_CLOSE';

export function openModal(name) {
  return {
    type: MODAL_OPEN,
    payload: {
      name,
    },
  };
}

export function closeModal(name) {
  return {
    type: MODAL_CLOSE,
    payload: {
      name,
    },
  };
}
