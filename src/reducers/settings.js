import { UPDATE_EMOJI, UPDATE_ACTION, UPDATE_COUNT_LIKES } from '_actions/settings';

const settingsDefault = {
  likesCount: 0,
  actionId: 1,
  moodId: 1,
};

export default function (list = { ...settingsDefault }, action) {
  const { type, payload } = action;

  switch (type) {
    case UPDATE_EMOJI:
      return {
        ...list,
        moodId: payload.moodId,
      };
    case UPDATE_ACTION:
      return {
        ...list,
        actionId: payload.actionId,
      };
    case UPDATE_COUNT_LIKES:
      return {
        ...list,
        likesCount: payload.likesCount,
      };
    default:
      return list;
  }
}
