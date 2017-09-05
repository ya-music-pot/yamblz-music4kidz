import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

import GradientPlayer from '_components/GradientPlayer';
import ButtonCircle from '_components/ButtonCircle';

import { saveLikesCount } from '_actions/settings';
import {
  setPlaylist, playerPlay, playerClear,
  playerNext,
} from '_actions/player';

import style from './style.styl';

class Player extends Component {
  state = {
    countChoose: 0,
    isSound: true,
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
    const { player, likesCount } = this.props;

    this.props.playerNext(player.trackId);
    this.props.saveLikesCount(likesCount + 1);
    this._handleUpdateChoose();
  }

  _handleSkip = () => {
    this.props.playerNext(this.props.player.trackId);
    this._handleUpdateChoose();
  }

  _handleToggleSound = () => {
    this.setState({ isSound: !this.state.isSound });
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
          typeIcon="heart"
          onClick={this._handleLike}
          className={style.like}
        />
        <ButtonCircle
          onClick={this._handleSkip}
          typeIcon="skip"
          className={style.skip}
        />
        <div className={style.sound}>
          { isSound &&
            <ButtonCircle
              onClick={this._handleToggleSound}
              typeIcon="sound"
              background="rgba(0,0,0,0)"
              className={style.soundIn}
            />
          }
          { !isSound &&
            <ButtonCircle
              onClick={this._handleToggleSound}
              typeIcon="sound-off"
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
  saveLikesCount: PropTypes.func,
  onNextStep: PropTypes.func,
  setPlaylist: PropTypes.func,
  playerPlay: PropTypes.func,
  playerNext: PropTypes.func,
  playerClear: PropTypes.func,
  likesCount: PropTypes.number,
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
  saveLikesCount,
  setPlaylist,
  playerPlay,
  playerClear,
  playerNext,
})(Player);
