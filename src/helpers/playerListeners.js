import AudioPlayer from '_helpers/AudioPlayer';
import {
  PLAYER_PROGRESS, PLAYER_ENDED, PLAYER_START,
  PLAYER_GET_RADIO,
} from '_actions/playerActionTypes.js';
import store from '_settings/store';

const Audio = ya.music.Audio;

export default () => {
  AudioPlayer.player.on(Audio.EVENT_PROGRESS, setProgress);
  AudioPlayer.player.on(Audio.EVENT_ENDED, setStopTrack);
};

function setProgress(times) {
  store.dispatch({
    type: PLAYER_PROGRESS,
    payload: times,
  });
}

function setStopTrack() {
  const { playlist, trackId, isRepeatMode, isRadio } = store.getState().player;
  const trackIndex = playlist.findIndex(item => item.id === trackId);

  let action;

  if (isRadio) {
    const state = store.getState();
    const { id } = state.user.data;

    store.dispatch({
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
    store.dispatch(action);
  }, 1000);
}

