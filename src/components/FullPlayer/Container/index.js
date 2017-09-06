import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Button from '_components/Button';
import CircularAvatar from '_components/CircularAvatar';
import Background from '_components/FullPlayer/Background';
import cl from 'classname';

import style from './style.styl';

export default class Container extends Component {
  _handleClickArrowDown = () => {}

  _handleClickDislike= () => {}

  _handleClickLike = () => {}

  _handleClickPlus= () => {}

  render() {
    const {
      trackName, singerName, isPlaying,
      position, duration, cover,
      isRepeatMode,
    } = this.props.playerState;

    const {
      onTogglePlay, onClickNext, onClickPrevious,
      onClickRepeat,
    } = this.props;

    const percentage = position / duration;
    const diffTrackPosition = position - duration;
    const minutesLeft = parseInt(diffTrackPosition / 60, 10).toString();
    const sec = -(parseInt(diffTrackPosition, 10) - minutesLeft * 60);
    const secondsLeft = (sec < 10 ? `0${sec}` : sec).toString();

    return (
      <div className={style.wrapper}>
        <div className={style.headerRow}>
          <Button style={style.buttonArrowDown} onClick={this._handleClickArrowDown} />
          <div className={style.moodIcons} />
        </div>
        <div>
          <div className={style.vote}>
            <Button style={style.buttonDislike} onClick={this._handleClickDislike} />
            <div className={style.spacer} />
            <Button style={style.buttonLike} onClick={this._handleClickLike} />
          </div>
          <CircularAvatar
            image={cover}
            progress={percentage}
            radius={0.18}
            time={`${minutesLeft}:${secondsLeft}`}
          />
        </div>
        <div className={style.titleRow}>
          <div className={style.songName}>
            {trackName}
          </div>
          <div className={style.artistName}>
            {singerName}
          </div>
        </div>
        <div className={style.controlsRow}>
          <Button style={style.buttonPrevious} onClick={onClickPrevious} />
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
          <Button style={style.buttonNext} onClick={onClickNext} />
        </div>
        <div className={style.bottomRow}>
          <Button style={style.buttonPlus} onClick={this._handleClickPlus} />
          <Button
            style={isRepeatMode ? style.buttonRepeatActive : style.buttonRepeatInactive}
            onClick={onClickRepeat}
          />
        </div>
        <Background
          cover={cover}
        />
      </div>
    );
  }
}

Container.propTypes = {
  onTogglePlay: PropTypes.func,
  onClickPrevious: PropTypes.func,
  onClickNext: PropTypes.func,
  onClickRepeat: PropTypes.func,
  isRepeatMode: PropTypes.bool,
  playerState: PropTypes.object,
};
