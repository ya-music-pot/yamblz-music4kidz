import React, { Component } from 'react';
import { connect } from 'react-redux';
import PlayerToggle from '_decorators/PlayerToggle';
import MiniPlayer from '_components/MiniPlayer';
import FullPlayer from '_components/FullPlayer';

import {
  setPlaylist, playerPlay, playerClear,
  playerNext, playerPrev, playerPause,
  playerResume, toggleRepeatMode,
} from '_actions/player';

class Player extends Component {
  componentWillReceiveProps(nextProps) {
    const inited = nextProps.playerInfo.inited;

    if (this.props.playerInfo.inited !== inited && inited) {
      const playlist = this.props.playlist;
      this.props.setPlaylist(playlist);
    }
  }

  componentWillUnmount() {
    this.props.playerClear();
  }

  _handlePlayButton = () => {
    const { player } = this.props;
    if (player.isPlaying) {
      this.props.playerPause();
    } else if (player.position !== 0) {
      this.props.playerResume();
    } else {
      this.props.playerPlay(player.trackId);
    }
    console.log('play');
  };

  _handleNextButton = () => {
    const { player } = this.props;
    this.props.playerNext(player.trackId);
    console.log('next');
  };

  _handlePreviousButton = () => {
    const { player } = this.props;
    this.props.playerPrev(player.trackId);
    console.log('previous');
  };

  _handleRepeatButton = () => {
    this.props.toggleRepeatMode();
    console.log('repeat');
  };

  render() {
    const { player } = this.props;
    console.log(player);
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
          type="full"
        />
      </PlayerToggle>
    );
  }
}

export default connect((state, props) => ({
  playerInfo: state.playerInfo,
  player: state.player,
  playlist: state.setup.playlist,
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
})(Player);
