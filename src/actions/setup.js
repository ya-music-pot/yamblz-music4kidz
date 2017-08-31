export const UPDATE_STEP = 'UPDATE_STEP';
export const CLEAR_SET_UP = 'CLEAR_SET_UP';

export function updateStep(newStep) {
  return {
    type: UPDATE_STEP,
    payload: {
      newStep,
    },
  };
}

export function clearSetUp() {
  return {
    type: CLEAR_SET_UP,
  };
}
