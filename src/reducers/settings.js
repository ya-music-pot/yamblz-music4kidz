import { UPDATE_EMOJI, UPDATE_ACTION, UPDATE_COUNT_LIKES } from '_actions/settings';

const settingsDefault = {
  likesCount: 0,
  activeEmoji: 'emoji-heart-eyes',
  activeAction: 'action-car',
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
    case UPDATE_COUNT_LIKES:
      return {
        ...list,
        likesCount: payload.likesCount,
      };
    default:
      return list;
  }
}
