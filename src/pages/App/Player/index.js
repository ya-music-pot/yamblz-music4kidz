import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import PlayerToggle from '_decorators/PlayerToggle';
import MiniPlayer from '_components/MiniPlayer';
import FullPlayer from '_components/FullPlayer';

import {
  setPlaylist, playerPlay, playerClear,
  playerNext, playerPrev, playerPause,
  playerResume, toggleRepeatMode, likeTrack,
  dislikeTrack,
} from '_actions/player';

import { openModal } from '_actions/modal';

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
    this.props.playerModeUpdate('mini');
  };

  _handleOpenListTracks = () => {
    this.props.openModal('listTracks');
  };

  _handleLikeButton = () => {
    const { player, userInfo } = this.props;
    this.props.likeTrack(userInfo.id, player.trackId);
  };

  _handleDislikeButton = () => {
    const { player, userInfo } = this.props;
    this.props.dislikeTrack(userInfo.id, player.trackId);
    this._handleNextButton();
  };

  render() {
    const {
      player, cardType, cardTitle,
      userInfo: { moodId, actionId },
      dictionaries: { listEmoji, listActions },
    } = this.props;
    const emojiStatus = {
      moodIcon: listEmoji.data[moodId].typeIcon,
      actionIcon: listActions.data[actionId].typeIcon,
    };

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
          openListTracks={this._handleOpenListTracks}
          onLikeClick={this._handleLikeButton}
          onDislikeClick={this._handleDislikeButton}
          type="full"
          cardType={cardType}
          cardTitle={cardTitle}
          emojiStatus={emojiStatus}
        />
      </PlayerToggle>
    );
  }
}

export default connect((state, props) => ({
  player: state.player,
  userInfo: state.user.data,
  cardType: state.playerInfo.cardType,
  cardTitle: state.playerInfo.cardTitle,
  dictionaries: state.dictionaries,
  ...props,
}), {
  openModal,
  setPlaylist,
  playerPlay,
  playerClear,
  playerNext,
  playerPrev,
  playerPause,
  playerResume,
  toggleRepeatMode,
  playerModeUpdate,
  likeTrack,
  dislikeTrack,
})(Player);

Player.propTypes = {
  player: PropTypes.object,
  openModal: PropTypes.func,
  playerPlay: PropTypes.func,
  playerNext: PropTypes.func,
  playerPrev: PropTypes.func,
  playerPause: PropTypes.func,
  playerResume: PropTypes.func,
  toggleRepeatMode: PropTypes.func,
  playerModeUpdate: PropTypes.func,
  cardType: PropTypes.number,
  likeTrack: PropTypes.func,
  dislikeTrack: PropTypes.func,
  userInfo: PropTypes.object,
  cardTitle: PropTypes.string,
  dictionaries: PropTypes.object,
};
