import { UPDATE_STEP, CLEAR_SET_UP } from '_actions/setup';

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
    case CLEAR_SET_UP:
      return {
        ...stateDefault,
      };
    default:
      return state;
  }
}
