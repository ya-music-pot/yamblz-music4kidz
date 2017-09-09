import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Button from '_components/Button';
import CircularAvatar from '_components/CircularAvatar';
import Background from '_components/FullPlayer/Background';
import cl from 'classname';
import CARDS from '_data/cardsType';

import style from './style.styl';

export default class Container extends Component {
  _handleClickDislike = () => {

  };

  _handleClickLike = () => {

  };

  _handleClickPlus = () => {

  };

  renderHeader() {
    const { headerRow, buttonArrowDown, moodIcons } = style;
    // TODO: render different titles (balloon, emoji, different text),
    // which depends on cardType from props
    const { onClickArrowDown } = this.props;
    return (
      <div className={headerRow}>
        <Button style={buttonArrowDown} onClick={onClickArrowDown} />
        <div className={moodIcons} />
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
              style['player-button'],
              isPlaying ? style['player-button--pause'] : style['player-button--play'],
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
      buttonRepeatInactive,
    } = style;
    const {
      onClickRepeat, cardType,
      playerState: { isRepeatMode },
    } = this.props;

    // TODO: set necessary icons
    let playlist = 'playlist';
    if (cardType === CARDS.radio || cardType === CARDS.single) {
      playlist = 'none';
    } else if (cardType === CARDS.personal) {
      playlist = 'balloon';
    }

    return (
      <div className={bottomRow}>
        <Button style={buttonPlus} onClick={this._handleClickPlus} />
        <div className={playlist} />
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
    );
  }
}

Container.propTypes = {
  onTogglePlay: PropTypes.func,
  onClickPrevious: PropTypes.func,
  onClickNext: PropTypes.func,
  onClickRepeat: PropTypes.func,
  onClickArrowDown: PropTypes.func,
  playerState: PropTypes.object,
  cardType: PropTypes.number,
};
