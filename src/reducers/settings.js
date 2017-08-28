import { UPDATE_DEFAULT_EMOJI, UPDATE_STEP } from '_actions/settings';

import steps from '_data/stepsSettings';

const settingsDefault = {
  saveData: {
    likesCount: 3,
    activeEmoji: null,
    activeAction: null,
  },
  defaultData: {
    likesCount: 0,
    activeEmoji: 'emoji-heart-eyes',
    activeAction: 'action-car',
  },
  activeStep: 1,
  steps,
};

export default function (list = { ...settingsDefault }, action) {
  const { type, payload } = action;

  switch (type) {
    case UPDATE_DEFAULT_EMOJI:
      return {
        ...list,
        defaultData: {
          ...list.defaultData,
          activeEmoji: payload.activeType,
        },
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
