import {
  playerPlay, setPlaylist, playerPause,
  setTrackInfo,
} from '_actions/player';
import { likePlaylist, dislikePlaylist } from '_actions/feed';
import { addUserPlaylist, deleteUserPlaylist } from '_actions/user';
import { showPlayer, playerModeUpdate } from '_actions/playerInfo';
import { openModal } from '_actions/modal';

import store from '_settings/store';

/**
 * Функция, запускающая плеер
 * @param {Object} params
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
 * Открывает список плейлиста в модальном окне
 * @param  {Object} params
 */
const openListTracks = (params) => {
  const {
    trackId, playlist, isRadio,
    playlistId,
  } = params;

  const track = playlist.find(item => item.id === trackId);

  store.dispatch(setPlaylist(playlist, isRadio, playlistId));
  store.dispatch(setTrackInfo({
    cover: track.image_url,
    singerName: track.artist,
    trackName: track.name,
    position: 0,
    duration: 0,
    shouldPlay: false,
    loaded: false,
  }));
  store.dispatch(openModal('listTracks', {
    title: 'Список треков',
  }));
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
 * Функция, добавляющая плейлист в плейлисты пользователя
 * или удаляющая его из него (если он уже там)
 * @param {Boolean} isLiked
 * @param {Object} playlist
 */
const onAddClick = (isLiked, playlist) => {
  const state = store.getState();
  const { id: userId } = state.user.data;
  if (isLiked) {
    store.dispatch(dislikePlaylist(userId, playlist.id));
    store.dispatch(deleteUserPlaylist(playlist));
  } else {
    store.dispatch(likePlaylist(userId, playlist.id));
    store.dispatch(addUserPlaylist(playlist));
  }
};

export default {
  onButtonClick,
  onCardClick: openListTracks,
  onAddClick,
};
