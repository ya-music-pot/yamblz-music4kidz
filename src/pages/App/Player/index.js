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
  dislikeTrack, getRadio, addTrack,
  deleteTrack, showSelector, closeSelector,
} from '_actions/player';
import { addUserTrack, deleteUserTrack, getAllTracks } from '_actions/user';
import { openModal } from '_actions/modal';
import { playerModeUpdate } from '_actions/playerInfo';

class Player extends Component {
  state = {
    isSelector: false,
    dislikeDisabled: false,
  };

  componentWillMount() {
    const userId = this.props.userInfo.id;
    if (userId) {
      this.props.getAllTracks(userId);
    }
  }

  _isTrackAdded = () => {
    const { userTracklist, player } = this.props;
    if (userTracklist) {
      return userTracklist.some((track) => track.id === player.trackId);
    }
    return false;
  };

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
    const { player, userInfo } = this.props;
    this.setState({ dislikeDisabled: false });

    if (player.isRadio && userInfo.id) {
      this.props.getRadio(userInfo.id);
    }

    this.props.playerNext(player.trackId);
  };

  _handlePreviousButton = () => {
    const { player } = this.props;
    this.setState({ dislikeDisabled: false });
    this.props.playerPrev(player.trackId);
  };

  _handleRepeatButton = () => {
    this.props.toggleRepeatMode();
  };

  _handleClickArrowDown = () => {
    this.setState({ dislikeDisabled: false });
    this.props.playerModeUpdate('mini');
  };

  _handleOpenListTracks = () => {
    this.props.openModal('listTracks');
  };

  _handleLikeButton = () => {
    const { player, userInfo } = this.props;
    this.setState({ dislikeDisabled: true });
    this.props.likeTrack(userInfo.id, player.trackId);
  };

  _handleDislikeButton = () => {
    const { player, userInfo } = this.props;
    this.props.dislikeTrack(userInfo.id, player.trackId);
    this.setState({ dislikeDisabled: false });
    this._handleNextButton();
  };

  _handlePlusButton = () => {
    const { player, userInfo } = this.props;
    const { playlist, trackId } = player;
    const isAdded = this._isTrackAdded();

    if (isAdded) {
      this.props.deleteTrack(userInfo.id, trackId);
      this.props.deleteUserTrack(trackId);
    } else {
      let currentTrack = null;
      playlist.some((track) => {
        if (track.id === trackId) {
          currentTrack = track;
          return true;
        }
        return false;
      });

      this.props.addTrack(userInfo.id, trackId);
      this.props.addUserTrack(currentTrack);
    }
  };

  _handleClickSelector = () => {
    this.setState({
      isSelector: true,
    });
    this.props.showSelector(true);
  };

  _handleCloseSelector = () => {
    this.setState({
      isSelector: false,
    });
    this.props.closeSelector(false);
  };

  render() {
    const {
      player, cardType, cardTitle,
      userInfo, dictionaries: { listEmoji,
        listActions },
    } = this.props;
    const { moodId, actionId } = userInfo;

    const emojiStatus = {
      moodIcon: moodId && listEmoji.data[moodId].typeIcon,
      actionIcon: actionId && listActions.data[actionId].typeIcon,
    };

    const playerCallbacks = {
      onTogglePlay: this._handlePlayButton,
      onClickNext: this._handleNextButton,
      onClickPrevious: this._handlePreviousButton,
      onClickRepeat: this._handleRepeatButton,
      onClickArrowDown: this._handleClickArrowDown,
      openListTracks: this._handleOpenListTracks,
      onLikeClick: this._handleLikeButton,
      onDislikeClick: this._handleDislikeButton,
      onPlusClick: this._handlePlusButton,
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
          playerCallbacks={playerCallbacks}
          type="full"
          cardType={cardType}
          cardTitle={cardTitle}
          emojiStatus={emojiStatus}
          isAdded={this._isTrackAdded()}
          listEmoji={listEmoji}
          listActions={listActions}
          userInfo={userInfo}
          isSelector={this.state.isSelector}
          onClickSelector={this._handleClickSelector}
          onCloseSelector={this._handleCloseSelector}
          dislikeDisabled={this.state.dislikeDisabled}
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
  userTracklist: state.user.tracks,
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
  getRadio,
  addTrack,
  deleteTrack,
  addUserTrack,
  deleteUserTrack,
  getAllTracks,
  showSelector,
  closeSelector,
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
  getRadio: PropTypes.func,
  addTrack: PropTypes.func,
  deleteTrack: PropTypes.func,
  addUserTrack: PropTypes.func,
  deleteUserTrack: PropTypes.func,
  getAllTracks: PropTypes.func,
  userTracklist: PropTypes.arrayOf(PropTypes.object),
  showSelector: PropTypes.func,
  closeSelector: PropTypes.func,
};
