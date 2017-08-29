import { UPDATE_STEP } from '_actions/setup';

import steps from '_data/stepsSetUp';

const stateDefault = {
  activeStep: 1,
  steps,
};

export default function (state = { ...stateDefault }, action) {
  const { type, payload } = action;

  switch (type) {
    case UPDATE_STEP:
      return {
        ...state,
        activeStep: payload.newStep,
      };
    default:
      return state;
  }
}
