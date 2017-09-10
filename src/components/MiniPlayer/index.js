import React, { Component } from 'react';
import PropTypes from 'prop-types';
import cl from 'classname';

import Button from '_components/Button';
import style from './style.styl';

export default class MiniPlayer extends Component {
  /**
   * Функция вычисляет заполенение прогрессбара
   * @param  {Number} trackPercentage
   * @return {Object}
   */
  _calculateProgressStyle = (trackPercentage) => ({
    right: `${100 - trackPercentage}%`,
  });

  render() {
    const { className, onTogglePlay, openFullPlayer } = this.props;

    const {
      trackName, singerName, isPlaying,
      position, duration,
    } = this.props.playerState;

    const percentage = position / duration;

    return (
      <div className={cl(style.wrapper, className)}>
        <div className={style.miniPlayer}>
          <div
            className={style.progress}
            style={this._calculateProgressStyle(percentage * 100)}
          />
          <Button
            style={
              cl(
                style.button,
                isPlaying ? style.buttonPause : style.buttonPlay,
              )
            }
            isPlaying={isPlaying}
            onClick={onTogglePlay}
          />

          <div className={style.title} onClick={openFullPlayer}>
            <div className={style.songTitle}>
              {trackName}
            </div>
            <div className={style.singerName}>
              {singerName}
            </div>
          </div>
        </div>
      </div>
    );
  }
}

MiniPlayer.propTypes = {
  openFullPlayer: PropTypes.func,
  playerState: PropTypes.object,
  className: PropTypes.string,
  onTogglePlay: PropTypes.func,
};
