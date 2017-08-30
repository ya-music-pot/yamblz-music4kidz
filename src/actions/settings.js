export const UPDATE_EMOJI = 'UPDATE_EMOJI';
export const UPDATE_ACTION = 'UPDATE_ACTION';
export const UPDATE_COUNT_LIKES = 'UPDATE_COUNT_LIKES';

export function saveEmoji(activeType) {
  return {
    type: UPDATE_EMOJI,
    payload: {
      activeType,
    },
  };
}

export function saveAction(activeType) {
  return {
    type: UPDATE_ACTION,
    payload: {
      activeType,
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
