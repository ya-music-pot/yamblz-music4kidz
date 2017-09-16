export const NEW_ERROR = 'NEW_ERROR';

export function saveError(status) {
  return {
    type: NEW_ERROR,
    payload: { status },
  };
}
