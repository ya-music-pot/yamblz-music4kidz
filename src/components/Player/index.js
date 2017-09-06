import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import PlayerToggle from '_decorators/PlayerToggle';
import MiniPlayer from '_components/MiniPlayer';
import FullPlayer from '_components/FullPlayer';

import {
  setPlaylist, playerPlay, playerClear,
  playerNext, playerPrev, playerPause,
  playerResume, toggleRepeatMode,
} from '_actions/player';

import { playerModeUpdate } from '_actions/playerInfo';

class Player extends Component {
  _handlePlayButton = () => {
    const { player } = this.props;

    if (player.isPlaying) {
      this.props.playerPause();
    } else if (player.position !== 0) {
      this.props.playerResume();
    } else {
      this.props.playerPlay(player.trackId);
    }
  };

  _handleNextButton = () => {
    const { player } = this.props;
    this.props.playerNext(player.trackId);
  };

  _handlePreviousButton = () => {
    const { player } = this.props;
    this.props.playerPrev(player.trackId);
  };

  _handleRepeatButton = () => {
    this.props.toggleRepeatMode();
  };

  _handleClickArrowDown = () => {
    console.log('arrowDown');
    this.props.playerModeUpdate('mini');
  }

  render() {
    const { player } = this.props;
    return (
      <PlayerToggle>
        <MiniPlayer
          playerState={player}
          onTogglePlay={this._handlePlayButton}
          type="mini"
        />
        <FullPlayer
          playerState={player}
          onTogglePlay={this._handlePlayButton}
          onClickNext={this._handleNextButton}
          onClickPrevious={this._handlePreviousButton}
          onClickRepeat={this._handleRepeatButton}
          onClickArrowDown={this._handleClickArrowDown}
          type="full"
        />
      </PlayerToggle>
    );
  }
}

export default connect((state, props) => ({
  player: state.player,
  ...props,
}), {
  setPlaylist,
  playerPlay,
  playerClear,
  playerNext,
  playerPrev,
  playerPause,
  playerResume,
  toggleRepeatMode,
  playerModeUpdate,
})(Player);

Player.propTypes = {
  player: PropTypes.object,
  playerPlay: PropTypes.func,
  playerNext: PropTypes.func,
  playerPrev: PropTypes.func,
  playerPause: PropTypes.func,
  playerResume: PropTypes.func,
  toggleRepeatMode: PropTypes.func,
  playerModeUpdate: PropTypes.func,
};
