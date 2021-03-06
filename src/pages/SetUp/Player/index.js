import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

import GradientPlayer from '_components/GradientPlayer';
import ButtonCircle from '_components/ButtonCircle';

import { saveTracks } from '_actions/settings';
import {
  setPlaylist, playerPlay, playerClear,
  playerNext, playerResume, playerPause,
} from '_actions/player';

import style from './style.styl';

class Player extends Component {
  state = {
    countChoose: 0,
    isSound: true,
  }
  componentWillMount() {
    if (this.props.playerInfo.inited) {
      const playlist = this.props.playlist;
      this.props.setPlaylist(playlist);
      this.props.playerPlay(playlist[0].id);
    }
  }

  componentWillReceiveProps(nextProps) {
    const inited = nextProps.playerInfo.inited;

    if (this.props.playerInfo.inited !== inited && inited) {
      const playlist = this.props.playlist;
      this.props.setPlaylist(playlist);
      this.props.playerPlay(playlist[0].id);
    }
  }

  componentWillUnmount() {
    this.props.playerClear();
  }

  _handleLike = () => {
    this._handleNextTrack(true);
  }

  _handleSkip = () => {
    this._handleNextTrack(false);
  }

  _handleNextTrack(isLiked) {
    const { player } = this.props;

    this.props.playerNext(player.trackId);
    this.props.saveTracks(player.trackId, isLiked);
    this._handleSetSound(true);
    this._handleUpdateChoose();
  }

  _handleToggleSound = () => {
    const newSound = !this.state.isSound;

    if (newSound) {
      this.props.playerResume();
    }

    if (!newSound) {
      this.props.playerPause();
    }

    this._handleSetSound(!this.state.isSound);
  }

  _handleSetSound(isSound) {
    this.setState({ isSound });
  }

  _handleUpdateChoose() {
    const countChoose = this.state.countChoose + 1;
    if (countChoose >= 3) {
      this.props.onNextStep();
      return;
    }
    this.setState({ countChoose });
  }

  renderButtons() {
    const { isSound } = this.state;
    return (
      <div className={style.wrapperButtons}>
        <ButtonCircle
          background="#ff3333"
          nameIcon="heart"
          onClick={this._handleLike}
          className={style.like}
        />
        <ButtonCircle
          onClick={this._handleSkip}
          nameIcon="skip"
          className={style.skip}
        />
        <div className={style.sound}>
          { isSound &&
            <ButtonCircle
              onClick={this._handleToggleSound}
              nameIcon="sound"
              background="rgba(0,0,0,0)"
              className={style.soundIn}
            />
          }
          { !isSound &&
            <ButtonCircle
              onClick={this._handleToggleSound}
              nameIcon="sound-off"
              background="rgba(0,0,0,0)"
              className={style.soundOut}
            />
          }
        </div>
      </div>
    );
  }

  render() {
    const isSound = this.state.isSound;
    const { cover, singerName, isPlaying } = this.props.player;
    return (
      <div className={style.container}>
        <div className={style.wrapperPlayer}>
          <div className={style.player}>
            <GradientPlayer
              isPlaying={isPlaying}
              image={cover}
              onLike={this._handleLike}
              onSkip={this._handleSkip}
              onToggleSound={this._handleToggleSound}
              isSound={isSound}
            />
            { this.renderButtons() }
          </div>
          <h3 className={style.title}>{ singerName }</h3>
        </div>
      </div>
    );
  }
}

Player.propTypes = {
  saveTracks: PropTypes.func,
  onNextStep: PropTypes.func,
  setPlaylist: PropTypes.func,
  playerPlay: PropTypes.func,
  playerNext: PropTypes.func,
  playerResume: PropTypes.func,
  playerPause: PropTypes.func,
  playerClear: PropTypes.func,
  playlist: PropTypes.array,
  playerInfo: PropTypes.shape({
    inited: PropTypes.bool,
  }),
  player: PropTypes.shape({
    cover: PropTypes.string,
    singerName: PropTypes.string,
    isPlaying: PropTypes.bool,
    trackId: PropTypes.number,
  }),
};

export default connect((state, props) => ({
  playerInfo: state.playerInfo,
  likesCount: state.settings.likesCount,
  listEmoji: state.dictionaries.listEmoji,
  tracksIds: state.settings.tracksIds,
  player: state.player,
  playlist: state.setup.playlist,
  ...props,
}), {
  setPlaylist,
  playerPlay,
  playerClear,
  playerNext,
  playerResume,
  playerPause,
  saveTracks,
})(Player);
