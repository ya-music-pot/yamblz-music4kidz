import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Button from '_components/Button';
import CircularAvatar from '_components/CircularAvatar';
import Background from '_components/FullPlayer/Background';
import cl from 'classname';

import style from './style.styl';

export default class Container extends Component {
  _handleClickArrowDown = () => {
    console.log('ArrowDown');
  }

  _handleClickDownload = () => {
    console.log('Download');
  }

  _handleClickDislike= () => {
    console.log('Dislike');
  }

  _handleClickLike = () => {
    console.log('Like');
  }

  _handleClickPlus= () => {
    console.log('Plus');
  }

  render() {
    const {
      playerState: {
        trackName, singerName, isPlaying,
        trackPercentage, minutesLeft, secondsLeft,
        cover,
      },
    } = this.props.playerState;

    const {
      onTogglePlay, onClickNext, onClickPrevious,
      onClickRepeat, isRepeatMode,
    } = this.props.onTogglePlay;

    return (
      <div className={style.wrapper}>
        <div className={style.headerRow}>
          <Button style={style.buttonArrowDown} onClick={this._handleClickArrowDown} />
          <div className={style.moodIcons} />
          <Button style={style.buttonDownload} onClick={this._handleClickDownload} />
        </div>
        <div>
          <div className={style.vote}>
            <Button style={style.buttonDislike} onClick={this._handleClickDislike} />
            <div className={style.spacer} />
            <Button style={style.buttonLike} onClick={this._handleClickLike} />
          </div>
          <CircularAvatar
            image={cover}
            progress={trackPercentage}
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
