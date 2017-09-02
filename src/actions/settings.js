export const UPDATE_EMOJI = 'UPDATE_EMOJI';
export const UPDATE_ACTION = 'UPDATE_ACTION';
export const UPDATE_COUNT_LIKES = 'UPDATE_COUNT_LIKES';

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

export function saveLikesCount(likesCount) {
  return {
    type: UPDATE_COUNT_LIKES,
    payload: {
      likesCount,
    },
  };
}
