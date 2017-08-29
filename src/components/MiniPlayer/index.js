import React, { Component } from 'react';
import PropTypes from 'prop-types';
import cl from 'classname';

import Button from '_components/Button';
import style from './style.scss';

export default class MiniPlayer extends Component {
  _calculateProgressStyle = (trackPercentage) => {
    const left = trackPercentage;

    return { left };
  };

  render() {
    const { trackName, singerName, trackPercentage, isPlaying, onClick, className } = this.props;

    return (
      <div className={cl(style.miniPlayer, className)}>
        <div
          className={style['miniPlayer-progress']}
          style={this._calculateProgressStyle(trackPercentage)}
        />
        <Button
          className={style['miniPlayer-button']}
          isPlaying={isPlaying}
          onClick={onClick}
        />
        <Title
          trackName={trackName}
          singerName={singerName}
        />
      </div>
    );
  }
}

MiniPlayer.propTypes = {
  trackName: PropTypes.string,
  singerName: PropTypes.string,
  trackPercentage: PropTypes.number,
  isPlaying: PropTypes.bool,
  onClick: PropTypes.func,
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
