import {
  playerPlay, setPlaylist, playerPause,
  playerResume,
} from '_actions/player';
import { likePlaylist, dislikePlaylist } from '_actions/feed';
import { addUserPlaylist, deleteUserPlaylist } from '_actions/user';
import { showPlayer, playerModeUpdate, setInfoCard } from '_actions/playerInfo';

import history from '_settings/history';

import CARDS from '_data/cardsType';

import store from '_settings/store';

/**
 * Функция, запускающая плеер
 * @param {Object} params
 */
export const runPlayer = (params) => {
  const {
    trackId, playlist, isRadio,
    playlistId, cardType, cardTitle,
  } = params;

  store.dispatch(showPlayer(cardType, cardTitle));
  store.dispatch(setPlaylist(playlist, isRadio, playlistId));
  store.dispatch(playerPlay(trackId));
};

/**
 * Открывает список плейлиста в модальном окне
 * @param  {Object} params
 */
const openListTracks = (params) => {
  const {
    playlist, cardType, cardTitle,
    cardCover,
  } = params;

  store.dispatch(setInfoCard({
    cardPlaylistType: cardType,
    cardPlaylistTitle: cardTitle,
    cardPlaylistCover: cardCover,
    cardPlaylist: playlist,
    cardParams: params,
    pathBack: history.getCurrentLocation(),
  }));
  history.push('/playlist');
};

const onCardClick = (params) => {
  const { cardType } = params;
  if (cardType === CARDS.radio ||
      cardType === CARDS.single ||
      cardType === CARDS.personal) {
    store.dispatch(playerModeUpdate('full'));
    runPlayer(params);
  } else {
    openListTracks(params);
  }
};

/**
 * Функция, обрабатывающая клик по кнопке на плейлисте
 * @param {Object} params
 */
const onButtonClick = (params) => {
  if (params.isPlaying) {
    store.dispatch(playerPause());
  } else if (
    typeof params.position !== 'undefined'
    && params.position !== 0
    && params.trackId === params.prevTrackId
  ) {
    store.dispatch(playerResume());
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
  onCardClick,
  onAddClick,
};
