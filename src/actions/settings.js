export const UPDATE_DEFAULT_EMOJI = 'UPDATE_DEFAULT_EMOJI';
export const UPDATE_STEP = 'UPDATE_STEP';

export function saveEmoji({ activeType }) {
  return {
    type: UPDATE_DEFAULT_EMOJI,
    payload: {
      activeType,
    },
  };
}

export function updateStep(newStep) {
  return {
    type: UPDATE_STEP,
    payload: {
      newStep,
    },
  };
}
