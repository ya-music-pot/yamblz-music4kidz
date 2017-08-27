export const SAVE_EMOJI = 'SAVE_EMOJI';

export function saveEmoji({ activeType }) {
  return {
    type: SAVE_EMOJI,
    payload: {
      activeType,
    },
  };
}
