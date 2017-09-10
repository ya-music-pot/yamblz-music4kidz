import React, { Component } from 'react';
import PropTypes from 'prop-types';
import cl from 'classname';

import Button from '_components/Button';
import CircularAvatar from '_components/CircularAvatar';
import Icon from '_components/Icon';

import CARDS from '_data/cardsType';

import Background from './Background';

import style from './style.styl';

export default class FullPlayer extends Component {
  _handleClickDislike = () => {

  };

  _handleClickLike = () => {

  };

  _handleClickPlus = () => {

  };

  renderHeader() {
    const { headerRow, buttonArrowDown, moodIcons } = style;
    // TODO: получать эмоции и класть name в стор
    const { onClickArrowDown, cardType } = this.props;
    const name = 'say my name';

    return (
      <div className={headerRow}>
        <Button style={buttonArrowDown} onClick={onClickArrowDown} />
        <div className={moodIcons}>{getTitleByCard(cardType, name)}</div>
      </div>
    );
  }

  renderLike() {
    const { vote, buttonDislike, spacer, buttonLike } = style;
    return (
      <div className={vote}>
        <Button style={buttonDislike} onClick={this._handleClickDislike} />
        <div className={spacer} />
        <Button style={buttonLike} onClick={this._handleClickLike} />
      </div>
    );
  }

  renderControls() {
    const { controlsRow, buttonPrevious, buttonNext } = style;
    const {
      onTogglePlay, onClickNext, onClickPrevious,
      playerState: { isPlaying }, cardType,
    } = this.props;
    let isPrevNeeded = true;
    switch (cardType) {
      case CARDS.radio:
      case CARDS.single:
      case CARDS.personal:
        isPrevNeeded = false;
        break;
      default:
        break;
    }

    return (
      <div className={controlsRow}>
        { isPrevNeeded && <Button style={buttonPrevious} onClick={onClickPrevious} /> }
        <Button
          style={
            cl(
              style.playerButton,
              isPlaying ? style.playerButtonPause : style.playerButtonPlay,
            )
          }
          isPlaying={isPlaying}
          onClick={onTogglePlay}
        />
        { cardType !== CARDS.single && <Button style={buttonNext} onClick={onClickNext} /> }
      </div>
    );
  }

  renderFooter() {
    const {
      bottomRow, buttonPlus, buttonRepeatActive,
      buttonRepeatInactive, buttonList,
    } = style;
    const {
      onClickRepeat, cardType, openListTracks,
      playerState: { isRepeatMode },
    } = this.props;

    let playlistControl = (<div>
      <Button style={buttonList} onClick={openListTracks}>
        <Icon className={style.icon} typeIcon="player-list" />
      </Button>
    </div>);
    if (cardType === CARDS.radio || cardType === CARDS.single) {
      playlistControl = null;
    } else if (cardType === CARDS.personal) {
      playlistControl = (<div>balloon</div>);
    }

    return (
      <div className={bottomRow}>
        <Button style={buttonPlus} onClick={this._handleClickPlus} />
        { playlistControl }
        <Button
          style={isRepeatMode ? buttonRepeatActive : buttonRepeatInactive}
          onClick={onClickRepeat}
        />
      </div>
    );
  }

  render() {
    const {
      playerState: {
        trackName, singerName, position,
        duration, cover,
      }, cardType,
    } = this.props;

    const percentage = position / duration;
    const diffTrackPosition = position - duration;
    const minutesLeft = parseInt(diffTrackPosition / 60, 10).toString();
    const sec = -(parseInt(diffTrackPosition, 10) - minutesLeft * 60);
    const secondsLeft = (sec < 10 ? `0${sec}` : sec).toString();

    return (
      <div>
        <div className={style.wrapper}>
          { this.renderHeader() }
          <div>
            { cardType === CARDS.personal && this.renderLike() }
            <CircularAvatar
              image={cover}
              progress={percentage}
              radius={0.18}
              time={`${minutesLeft}:${secondsLeft}`}
            />
          </div>
          <div className={style.titleRow}>
            <div className={style.songName}>{trackName}</div>
            <div className={style.artistName}>{singerName}</div>
          </div>
          { this.renderControls() }
          { this.renderFooter() }
          <Background cover={cover} />
        </div>
      </div>
    );
  }
}

FullPlayer.propTypes = {
  onTogglePlay: PropTypes.func,
  onClickPrevious: PropTypes.func,
  onClickNext: PropTypes.func,
  onClickRepeat: PropTypes.func,
  onClickArrowDown: PropTypes.func,
  openListTracks: PropTypes.func,
  playerState: PropTypes.object,
  cardType: PropTypes.number,
};

/*
  Helpers
 */
function getTitleByCard(cardType, name) {
  switch (cardType) {
    case CARDS.radio:
      return `Радио ${name}`;
    case CARDS.single:
      return 'Модный трек';
    case CARDS.game:
      return 'Слушай и играй';
    case CARDS.personal:
      return 'emoji';
    default:
      return null;
  }
}

