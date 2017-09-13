export const MODAL_OPEN = 'MODAL_OPEN';
export const MODAL_CLOSE = 'MODAL_CLOSE';

export function openModal(name, data) {
  return {
    type: MODAL_OPEN,
    payload: {
      name,
      data,
    },
  };
}

export function closeModal() {
  return {
    type: MODAL_CLOSE,
  };
}
