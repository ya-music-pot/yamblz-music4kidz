import AudioPlayer from '_helpers/AudioPlayer';
import * as ActionTypes from '_actions/playerActionsTypes';

export default ({ dispatch, getState }) => (next) => (action) => {
  const { player, type, ...rest } = action;

  // TODO вынести этот URL
  const AUDIO_URL = 'https://dl.dropboxusercontent.com/s/';

  if (!player) {
    return next(action);
  }

  const store = getState();
  const track = store.tracks[player.trackId];

  switch (type) {
    case ActionTypes.PLAYER_START: {
      const trackUrl = `${AUDIO_URL}${track.mp3Url}`;
      AudioPlayer.player.play(trackUrl);
      break;
    }
    case ActionTypes.PLAYER_STOP:
      AudioPlayer.player.stop();
      break;
    case ActionTypes.PLAYER_PAUSE:
      AudioPlayer.player.pause();
      break;
    case ActionTypes.PLAYER_RESUME:
      AudioPlayer.player.resume();
      break;
    default:
      break;
  }
};
