export const UPDATE_STEP = 'UPDATE_STEP';

export function updateStep(newStep) {
  return {
    type: UPDATE_STEP,
    payload: {
      newStep,
    },
  };
}
