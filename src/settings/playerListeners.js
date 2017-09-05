import AudioPlayer from '_helpers/AudioPlayer';
import { PLAYER_PROGRESS, PLAYER_ENDED, PLAYER_START, PLAYER_GET_RADIO } from '_actions/playerActionTypes.js';

const Audio = ya.music.Audio;

export default (dispatch, getState) => {
  AudioPlayer.player.on(Audio.EVENT_PROGRESS, (times) => {
    dispatch({
      type: PLAYER_PROGRESS,
      payload: times,
    });
  });

  AudioPlayer.player.on(Audio.EVENT_ENDED, () => {
    const store = getState();

    const { playlist, trackId, isRepeatMode, isRadio } = store.player;
    const trackIndex = playlist.findIndex(item => item.id === trackId);

    let action;

    if (isRadio) {
      const { id } = store.user.data;
      dispatch({
        type: PLAYER_GET_RADIO,
        callAPI: {
          url: `${API_URL}user/${id}/radio`,
        },
      });
    }

    if (isRepeatMode) {
      action = {
        type: PLAYER_START,
        player: { trackId },
        payload: { trackId },
      };
    } else if (trackIndex < playlist.length - 1) {
      const nextTrackId = playlist[trackIndex + 1].id;
      action = {
        type: PLAYER_START,
        player: {
          trackId: nextTrackId,
        },
        payload: {
          trackId: nextTrackId,
        },
      };
    } else {
      action = {
        type: PLAYER_ENDED,
      };
    }

    setTimeout(() => {
      dispatch(action);
    }, 1000);
  });
};
