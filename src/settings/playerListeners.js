import AudioPlayer from '_helpers/AudioPlayer';
import { PLAYER_PROGRESS, PLAYER_ENDED, PLAYER_START } from '_actions/playerActionTypes.js';

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

    const { playlistId, trackId, isRepeatMode } = store.player;
    const { feed } = store;

    const playlist = feed.data.find(item => item.id === playlistId);
    const trackIndex = playlist.tracks.findIndex(item => item.id === trackId);

    let action;

    if (isRepeatMode) {
      action = {
        type: PLAYER_START,
        player: { trackId },
        payload: { trackId },
      };
    } else if (trackIndex < playlist.tracks.length - 1) {
      const nextTrackId = playlist.tracks[trackIndex + 1].id;
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
