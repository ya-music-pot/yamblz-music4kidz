import { UPDATE_EMOJI, UPDATE_ACTION } from '_actions/settings';

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
    default:
      return list;
  }
}
