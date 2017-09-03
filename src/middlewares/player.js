import AudioPlayer from '_helpers/AudioPlayer';
import * as ActionTypes from '_actions/playerActionTypes.js';

export default ({ dispatch, getState }) => (next) => (action) => {
  const { player, type, ...rest } = action;

  if (!player) {
    return next(action);
  }

  dispatch({ ...rest, type });

  const store = getState();
  const track = store.tracks[player.trackId];

  switch (type) {
    case ActionTypes.PLAYER_START: {
      const trackUrl = track.mp3Url;

      dispatch({
        type: ActionTypes.PLAYER_SAVE_TRACK,
        payload: track,
      });

      AudioPlayer.player
        .play(trackUrl)
        .catch(() => dispatch({
          type: ActionTypes.PLAYER_STOP,
        }));
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

  return next(action);
};
