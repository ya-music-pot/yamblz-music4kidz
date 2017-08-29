import React, { Component } from 'react';
import PropTypes from 'prop-types';
import cl from 'classname';

import Button from '_components/Button';
import style from './style.scss';

export default class MiniPlayer extends Component {
  _calculateProgressStyle = (trackPercentage) => {
    return {
      right: `${100 - trackPercentage}%`,
    };
  };

  render() {
    const { trackName, singerName, trackPercentage, isPlaying, onTogglePlay, onDownload, className } = this.props;

    return (
      <div className={style['miniPlayer-wrapper']}>
        <div className={cl(style.miniPlayer, className)}>
          <div
            className={style['miniPlayer-progress']}
            style={this._calculateProgressStyle(trackPercentage)}
          />
          <Button
            style={
              cl(
                style['miniPlayer-button'],
                isPlaying ? style['miniPlayer-button--play'] : style['miniPlayer-button--pause'],
              )
            }
            isPlaying={isPlaying}
            onClick={onTogglePlay}
          />
          <Title
            trackName={trackName}
            singerName={singerName}
          />
          <Button
            style={cl(style['miniPlayer-button'], style['miniPlayer-button--download'])}
            onClick={onDownload}
          />
        </div>
      </div>
    );
  }
}

MiniPlayer.propTypes = {
  trackName: PropTypes.string,
  singerName: PropTypes.string,
  trackPercentage: PropTypes.number,
  isPlaying: PropTypes.bool,
  onTogglePlay: PropTypes.func,
  onDownload: PropTypes.func,
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
