import AudioPlayer from '_helpers/AudioPlayer';
import { PLAYER_PROGRESS, PLAYER_ENDED } from '_actions/playerActionTypes.js';

const Audio = ya.music.Audio;

export default (dispatch) => {
  AudioPlayer.player.on(Audio.EVENT_PROGRESS, (times) => {
    dispatch({
      type: PLAYER_PROGRESS,
      payload: times,
    });
  });

  AudioPlayer.player.on(Audio.EVENT_ENDED, () => {
    dispatch({
      type: PLAYER_ENDED,
    });
  });
};
