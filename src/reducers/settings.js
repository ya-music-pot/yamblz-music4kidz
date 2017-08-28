import { UPDATE_EMOJI, UPDATE_STEP, UPDATE_ACTION } from '_actions/settings';

import steps from '_data/stepsSettings';

const settingsDefault = {
  likesCount: 0,
  activeEmoji: 'emoji-heart-eyes',
  activeAction: 'action-car',
  activeStep: 1,
  steps,
};

export default function (list = { ...settingsDefault }, action) {
  const { type, payload } = action;

  switch (type) {
    case UPDATE_EMOJI:
      return {
        ...list,
        activeEmoji: payload.activeType,
      };
    case UPDATE_ACTION:
      return {
        ...list,
        activeAction: payload.activeType,
      };
    case UPDATE_STEP:

      return {
        ...list,
        activeStep: payload.newStep,

      };
    default:
      return list;
  }
}
