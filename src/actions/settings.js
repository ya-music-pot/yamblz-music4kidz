export const UPDATE_EMOJI = 'UPDATE_EMOJI';
export const UPDATE_ACTION = 'UPDATE_ACTION';
export const UPDATE_STEP = 'UPDATE_STEP';

export function saveEmoji({ activeType }) {
  return {
    type: UPDATE_EMOJI,
    payload: {
      activeType,
    },
  };
}

export function saveAction({ activeType }) {
  return {
    type: UPDATE_ACTION,
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
