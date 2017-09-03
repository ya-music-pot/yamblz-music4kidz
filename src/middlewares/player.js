import AudioPlayer from '_helpers/AudioPlayer';
import * as ActionTypes from '_actions/playerActionTypes.js';

export default ({ dispatch, getState }) => (next) => (action) => {
  const { player, type, ...rest } = action;

  if (!player) {
    return next(action);
  }

  dispatch({ ...rest, type });

  const store = getState();
  const { playlistId } = store.player;
  const { trackId } = player;

  const playlist = store.feed.data.find(item => item.id === playlistId);
  const track = playlist.tracks.find(item => item.id === trackId);

  switch (type) {
    case ActionTypes.PLAYER_START: {
      const trackUrl = track.mp3_url;
      return AudioPlayer.player
        .play(trackUrl)
        .catch(() => {
          dispatch({
            type: ActionTypes.PLAYER_STOP,
          });
        });
    }
    case ActionTypes.PLAYER_STOP:
      return AudioPlayer.player.stop();
    case ActionTypes.PLAYER_PAUSE:
      return AudioPlayer.player.pause();
    case ActionTypes.PLAYER_RESUME:
      return AudioPlayer.player.resume();
    case ActionTypes.RESTART:
      return AudioPlayer.player.restart();
    default:
      return next(action);
  }
};
