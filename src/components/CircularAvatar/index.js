import React, { Component } from 'react';
import PropTypes from 'prop-types';

import style from './style.styl';
import defaultCover from './images/default.jpg';

export default class CircularAvatar extends Component {
  _polarToCartesian = (centerX, centerY, radius, angleInDegrees) => {
    const angleInRadians = (angleInDegrees - 90) * Math.PI / 180.0;

    return {
      x: centerX + (radius * Math.cos(angleInRadians)),
      y: centerY + (radius * Math.sin(angleInRadians)),
    };
  }

  _describeArc = (x, y, radius, startAngle, endAngle) => {
    const start = this._polarToCartesian(x, y, radius, parseInt(endAngle));
    const end = this._polarToCartesian(x, y, radius, startAngle);
    const largeArcFlag = endAngle - startAngle <= 180 ? '0' : '1';

    return [
      'M', start.x, start.y,
      'A', radius, radius, 0, largeArcFlag, 0, end.x, end.y,
    ].join(' ');
  }

  render() {
    const {
      progress, image, radius,
      time,
    } = this.props;

    const imageUri = (image !== 'null') ? image : defaultCover;
    const percentage = (isNaN(progress)) ? 0 : progress;

    return (
      <div className={style.wrapper}>
        <svg className={style.progressBar}>
          <defs>
            <linearGradient id="linear-gradient" x2="0%" y2="100%">
              <stop offset="5%" stopColor="#ffde5a" />
              <stop offset="95%" stopColor="#5fcef9" />
            </linearGradient>
          </defs>
          <path
            d={this._describeArc(
              document.documentElement.clientHeight * radius,
              document.documentElement.clientHeight * radius,
              document.documentElement.clientHeight * radius,
              0,
              percentage * 360,
            )}
            stroke="url(#linear-gradient)"
            strokeWidth="11"
          />
        </svg>
        <img
          src={imageUri}
          className={style.circularImage}
          alt=""
        />
        <div className={style.controls}>
          <div className={style.timeLeft}>
            {time}
          </div>
          <div className={style.spacer} />
        </div>
      </div>
    );
  }
}

CircularAvatar.propTypes = {
  progress: PropTypes.number,
  radius: PropTypes.number,
  time: PropTypes.string,
  image: PropTypes.string,
};
