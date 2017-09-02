import AudioPlayer from '_helpers/AudioPlayer';
import { PLAYER_START } from '_actions/player';

export default ({ dispatch, getState }) => (next) => (action) => {
  const { player, type, ...rest } = action;

  if (!player) {
    return next(action);
  }

  const store = getState();
  const track = store.tracks[player.trackId];

  switch (type) {
    case PLAYER_START: {
      const trackUrl = `${API_URL}/track.mp3Url`;
      AudioPlayer.player.play(trackUrl);
      break;
    }
    default:
      break;
  }
};
