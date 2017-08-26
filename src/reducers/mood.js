import { SAVE_EMOJI } from '_actions/mood';

const defaultState = {
  activeType: 'emoji-heart-eyes',
};

export default function mood(state = defaultState, action) {
  const { type, payload } = action;

  switch (type) {
    case SAVE_EMOJI:
      return {
        ...state,
        activeType: payload.activeType,
      };

    default:
      return state;
  }
}
