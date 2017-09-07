import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

import Topbar from '_components/Topbar';

import { playerPlay, setPlaylist, playerPause } from '_actions/player';
import { showPlayer, playerModeUpdate } from '_actions/playerInfo';

import style from './style.styl';
import CardList from './CardList';
import PersonalRadio from './PersonalRadio';

class Feed extends Component {
  _onButtonClick = (trackId, playlist, isRadio = false, playlistId, isPlaying) => {
    if (isPlaying) {
      this.props.playerPause();
    } else {
      this.props.playerModeUpdate('mini');
      this.props.showPlayer(playlist, isRadio);
      this.props.setPlaylist(playlist, isRadio, playlistId);
      this.props.playerPlay(trackId);
    }
  };

  _onCardClick = (trackId, playlist, isRadio = false, playlistId, isPlaying) => {
    if (isPlaying) {
      this.props.playerPause();
    } else {
      this.props.playerModeUpdate('full');
      this.props.showPlayer(playlist, isRadio);
      this.props.setPlaylist(playlist, isRadio, playlistId);
      this.props.playerPlay(trackId);
    }
  };

  render() {
    const { playlist, container } = style;

    const callbacks = {
      onButtonClick: this._onButtonClick,
      onCardClick: this._onCardClick,
    };

    return (
      <div className={playlist}>
        <div className={container}>
          <Topbar />
          <PersonalRadio callbacks={callbacks} />
          <CardList callbacks={callbacks} />
        </div>
      </div>
    );
  }
}

Feed.propTypes = {
  playerPlay: PropTypes.func,
  setPlaylist: PropTypes.func,
  showPlayer: PropTypes.func,
  playerModeUpdate: PropTypes.func,
  playerPause: PropTypes.func,
};

export default connect((state, props) => ({
  playerInfo: state.playerInfo,
  player: state.player,
  playlist: state.feed.data,
  ...props,
}), {
  playerPlay,
  setPlaylist,
  showPlayer,
  playerModeUpdate,
  playerPause,
})(Feed);
