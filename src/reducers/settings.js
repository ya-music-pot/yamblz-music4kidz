import { UPDATE_EMOJI, UPDATE_ACTION, UPDATE_TRACKS } from '_actions/settings';
import { CLEAR_SET_UP } from '_actions/setup';

const settingsDefault = {
  tracks: [],
  actionId: 1,
  moodId: 1,
  likesCount: 0,
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

    case UPDATE_TRACKS: {
      const { trackId, liked } = payload;
      const likesCount = liked ? list.likesCount + 1 : list.likesCount;
      return {
        ...list,
        likesCount,
        tracks: list.tracks.concat({
          track_id: trackId,
          liked,
        }),
      };
    }

    case CLEAR_SET_UP:
      return {
        ...settingsDefault,
      };

    default:
      return list;
  }
}
