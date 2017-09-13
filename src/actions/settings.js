export const UPDATE_EMOJI = 'UPDATE_EMOJI';
export const UPDATE_ACTION = 'UPDATE_ACTION';
export const UPDATE_TRACKS = 'UPDATE_TRACKS';

export function saveEmoji(moodId) {
  return {
    type: UPDATE_EMOJI,
    payload: {
      moodId,
    },
  };
}

export function saveAction(actionId) {
  return {
    type: UPDATE_ACTION,
    payload: {
      actionId,
    },
  };
}

export function saveTracks(trackId, liked) {
  return {
    type: UPDATE_TRACKS,
    payload: {
      trackId,
      liked,
    },
  };
}
