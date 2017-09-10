import { playerPlay, setPlaylist, playerPause } from '_actions/player';
import { showPlayer, playerModeUpdate } from '_actions/playerInfo';
import store from '_settings/store';

/**
 * Функция, запускающая плеер
 * @param params
 */
const runPlayer = (params) => {
  const {
    trackId, playlist, isRadio,
    playlistId, cardType,
  } = params;
  store.dispatch(showPlayer(cardType));
  store.dispatch(setPlaylist(playlist, isRadio, playlistId));
  store.dispatch(playerPlay(trackId));
};

/**
 * Функция, обрабатывающая клик по кнопке на плейлисте
 * @param {Object} params
 */
const onButtonClick = (params) => {
  if (params.isPlaying) {
    store.dispatch(playerPause());
  } else {
    store.dispatch(playerModeUpdate('mini'));
    runPlayer(params);
  }
};

/**
 * Функция, обрабатывающая клик по карточке плейлиста
 * @param {Object} params
 */
const onCardClick = (params) => {
  store.dispatch(playerModeUpdate('full'));
  runPlayer(params);
};

export default {
  onButtonClick,
  onCardClick,
};
