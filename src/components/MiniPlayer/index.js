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
    const {
      className, onTogglePlay,
    } = this.props;

    const {
      trackName, singerName, isPlaying,
      position, duration,
    } = this.props.playerState;

    const percentage = position / duration;

    return (
      <div className={cl(style['miniPlayer-wrapper'], className)}>
        <div className={style.miniPlayer}>
          <div
            className={style['miniPlayer-progress']}
            style={this._calculateProgressStyle(percentage * 100)}
          />
          <Button
            style={
              cl(
                style['miniPlayer-button'],
                isPlaying ? style['miniPlayer-button--pause'] : style['miniPlayer-button--play'],
              )
            }
            isPlaying={isPlaying}
            onClick={onTogglePlay}
          />
          <Title
            trackName={trackName}
            singerName={singerName}
          />
        </div>
      </div>
    );
  }
}

MiniPlayer.propTypes = {
  playerState: PropTypes.object,
  className: PropTypes.string,
  onTogglePlay: PropTypes.func,
};

const Title = (props) => (
  <div className={style['miniPlayer-title']}>
    <div className={style['miniPlayer-songTitle']}>
      {props.trackName}
    </div>
    <div className={style['miniPlayer-singerName']}>
      {props.singerName}
    </div>
  </div>
);


Title.propTypes = {
  trackName: PropTypes.string,
  singerName: PropTypes.string,
};
