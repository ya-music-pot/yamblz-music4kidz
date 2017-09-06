import AudioPlayer from '_helpers/AudioPlayer';
import * as ActionTypes from '_actions/playerActionTypes.js';

export default ({ dispatch, getState }) => (next) => (action) => {
  const { player, type, ...rest } = action;

  if (!player) {
    return next(action);
  }

  dispatch({ ...rest, type });

  const store = getState();
  const { playlist } = store.player;
  const { trackId } = player;

  const track = playlist.find(item => item.id === trackId);

  switch (type) {
    case ActionTypes.PLAYER_START: {
      dispatch({
        type: ActionTypes.SET_TRACK_INFO,
        payload: {
          cover: track.image_url,
          singerName: track.artist,
          trackName: track.name,
        },
      });

      return playerPlay(dispatch, track.mp3_url);
    }

    case ActionTypes.PLAYER_STOP: {
      return AudioPlayer.player.stop();
    }

    case ActionTypes.PLAYER_PAUSE: {
      return AudioPlayer.player.pause();
    }

    case ActionTypes.PLAYER_RESUME: {
      return AudioPlayer.player.resume();
    }

    case ActionTypes.PLAYER_NEXT: {
      const trackIndex = playlist.indexOf(track);

      if (trackIndex === playlist.length - 1) {
        const firstTrack = playlist[0];

        dispatch({
          type: ActionTypes.SET_TRACK_INFO,
          payload: {
            isPlaying: false,
            trackId: firstTrack.id,
            cover: firstTrack.image_url,
            singerName: firstTrack.artist,
            trackName: firstTrack.name,
          },
        });

        return AudioPlayer.player.stop();
      }
      const nextTrack = playlist[trackIndex + 1];
      const trackUrl = nextTrack.mp3_url;

      dispatch({
        type: ActionTypes.SET_TRACK_INFO,
        payload: {
          trackId: nextTrack.id,
          cover: nextTrack.image_url,
          singerName: nextTrack.artist,
          trackName: nextTrack.name,
        },
      });

      return playerPlay(dispatch, trackUrl);
    }

    case ActionTypes.PLAYER_PREV: {
      const trackIndex = playlist.indexOf(track);

      if (trackIndex === 0) {
        dispatch({
          type: ActionTypes.SET_TRACK_INFO,
          payload: {
            isPlaying: false,
          },
        });

        return AudioPlayer.player.stop();
      }

      const { position } = store.player;
      const prevTrack = position ? playlist[trackIndex - 1] : track;
      const trackUrl = prevTrack.mp3_url;

      dispatch({
        type: ActionTypes.SET_TRACK_INFO,
        payload: {
          trackId: prevTrack.id,
          cover: prevTrack.image_url,
          singerName: prevTrack.artist,
          trackName: prevTrack.name,
        },
      });

      return playerPlay(dispatch, trackUrl);
    }

    case ActionTypes.SET_PLAYLIST: {
      let { isRadio } = player;
      const { id } = store.user.data;

      if (typeof isRadio === 'undefined') {
        isRadio = store.player.isRadio;
      }

      if (isRadio && id) {
        return dispatch({
          type: ActionTypes.PLAYER_GET_RADIO,
          callAPI: {
            url: `${API_URL}user/${id}/radio`,
          },
        });
      }

      return next(action);
    }

    default:
      break;
  }

  return next(action);
};

/**
 * playerPlay
 * @param  {Function} dispatch
 * @param  {String} trackUrl
 * @return {Promise}
 */
function playerPlay(dispatch, trackUrl) {
  return AudioPlayer.player.play(trackUrl).then(() => {
    dispatch({ type: ActionTypes.PLAYER_PLAYED });
  }).catch(() => {
    dispatch({ type: ActionTypes.PLAYER_STOP });
  });
}
