import AudioPlayer from '_helpers/AudioPlayer';
import * as ActionTypes from '_actions/playerActionTypes.js';

export default ({ dispatch, getState }) => (next) => (action) => {
  const { player, type, ...rest } = action;

  // TODO вынести этот URL
  const AUDIO_URL = 'https://dl.dropboxusercontent.com/s/';

  if (!player) {
    return next(action);
  }

  dispatch({ ...rest, type });

  const store = getState();
  const track = store.tracks[player.trackId];

  switch (type) {
    case ActionTypes.PLAYER_START: {
      const trackUrl = `${AUDIO_URL}${track.mp3Url}`;
      return AudioPlayer.player
        .play(trackUrl)
        .catch(() => dispatch({
          type: ActionTypes.PLAYER_STOP,
        }));
    }
    case ActionTypes.PLAYER_STOP:
      return AudioPlayer.player.stop();
    case ActionTypes.PLAYER_PAUSE:
      return AudioPlayer.player.pause();
    case ActionTypes.PLAYER_RESUME:
      return AudioPlayer.player.resume();
    default:
      return next(action);
  }
};
