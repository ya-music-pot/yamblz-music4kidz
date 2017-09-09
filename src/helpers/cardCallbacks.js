import { playerPlay, setPlaylist, playerPause } from '_actions/player';
import { showPlayer, playerModeUpdate } from '_actions/playerInfo';
import store from '_settings/store';

const onClick = (params) => {
  const {
    trackId, playlist, isRadio,
    playlistId, cardType,
  } = params;
  store.dispatch(showPlayer(cardType));
  store.dispatch(setPlaylist(playlist, isRadio, playlistId));
  store.dispatch(playerPlay(trackId));
};

const onButtonClick = (params) => {
  if (params.isPlaying) {
    store.dispatch(playerPause());
  } else {
    store.dispatch(playerModeUpdate('mini'));
    onClick(params);
  }
};

const onCardClick = (params) => {
  store.dispatch(playerModeUpdate('full'));
  onClick(params);
};

export default {
  onButtonClick,
  onCardClick,
};
