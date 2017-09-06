import React, { Component } from 'react';
import PropTypes from 'prop-types';
import cl from 'classname';

import Button from '_components/Button';
import style from './style.styl';

export default class MiniPlayer extends Component {
  _handlePlayButton = () => {
    console.log('play');
  };
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
      className,
    } = this.props;

    const {
        trackName, singerName, isPlaying,
        position,
    } = this.props.playerState;

    return (
      <div className={cl(style['miniPlayer-wrapper'], className)}>
        <div className={style.miniPlayer}>
          <div
            className={style['miniPlayer-progress']}
            style={this._calculateProgressStyle(position)}
          />
          <Button
            style={
              cl(
                style['miniPlayer-button'],
                isPlaying ? style['miniPlayer-button--pause'] : style['miniPlayer-button--play'],
              )
            }
            isPlaying={isPlaying}
            onClick={this._handlePlayButton}
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
