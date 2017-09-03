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
    const { isRadio } = store.player;

    if (isRadio) {
      // TODO изменить логику
      dispatch({
        type: PLAYER_ENDED,
      });
    } else {
      // Определим id трека для исполнения
      const { playlistId, trackId } = store.player;
      const { feed } = store;

      const playlist = feed.data.find(item => item.id === playlistId);
      const trackIndex = playlist.tracks.findIndex(item => item.id === trackId);

      if (trackIndex < playlist.tracks.length - 1) {
        const nextTrackId = playlist.tracks[trackIndex + 1].id;

        // Задержка между треками 1 с
        setTimeout(() => {
          dispatch({
            type: PLAYER_START,
            player: {
              trackId: nextTrackId,
            },
            payload: {
              trackId: nextTrackId,
            },
          });
        }, 1000);
      } else {
        dispatch({
          type: PLAYER_ENDED,
        });
      }
    }
  });
};
