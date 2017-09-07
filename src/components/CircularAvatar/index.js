import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import Hammer from 'hammerjs';

import style from './style.styl';
import defaultCover from './images/default.jpg';

import {
  setPosition,
} from '_actions/player';

class CircularAvatar extends Component {
  state = {
    curAngle: 0,
    pivotX: 0,
    pivotY: 0,
    xStart: 0,
    yStart: 0,
    seekActive: false,
  };

  _polarToCartesian = (centerX, centerY, radius, angleInDegrees) => {
    const angleInRadians = (angleInDegrees - 90) * Math.PI / 180.0;

    return {
      x: centerX + (radius * Math.cos(angleInRadians)),
      y: centerY + (radius * Math.sin(angleInRadians)),
    };
  }

  _describeArc = (x, y, radius, startAngle, endAngle) => {
    const start = this._polarToCartesian(x, y, radius, endAngle);
    const end = this._polarToCartesian(x, y, radius, startAngle);
    const largeArcFlag = endAngle - startAngle <= 180 ? '0' : '1';

    return [
      'M', start.x, start.y,
      'A', radius, radius, 0, largeArcFlag, 0, end.x, end.y,
    ].join(' ');
  }

  _seekBar = (target) => {
    this.seekBarNode = target;
  }

  _seekBarProcess = (e) => {
    const { player } = this.props;

    let dx = e.center.x - this.state.pivotX,
        dy = e.center.y - this.state.pivotY;

    if (e.eventType == 1) {
      this.setState({
        seekActive: true,
        xStart: 0,
        yStart: - this.state.pivotY + document.documentElement.clientHeight * 0.14,
      });
    }

    this.setState({
      curAngle: (dx > 0) ? this._calculateAngle(dx, dy) : 2 - this._calculateAngle(dx, dy),
    });

    if (e.eventType == 4) {
      this.setState({
        seekActive: false,
      });
      this.props.setPosition(this.props.player.duration * this.state.curAngle / 2);
    }
  }

  _calculateAngle = (x, y) => {
    let numerator,
        denumerator;
    numerator = this.state.xStart * x + this.state.yStart * y;
    denumerator = Math.sqrt(Math.pow(x, 2) + Math.pow(y, 2))
                * Math.sqrt(Math.pow(this.state.xStart, 2)
                + Math.pow(this.state.yStart, 2));
    return Math.acos(numerator / denumerator) / Math.PI;
  }

  _getPivotCoordinates() {
    this.setState({
      pivotX: document.documentElement.clientWidth / 2,
      pivotY: document.documentElement.clientHeight * 0.33,
    });
  }

  componentDidMount() {
    this._getPivotCoordinates();
    this.hammerSeekBar = Hammer(this.seekBarNode);
    this.hammerSeekBar.on('hammer.input', this._seekBarProcess);
  }

  render() {
    const {
      progress, image, radius,
      time,
    } = this.props;

    const imageUri = (image !== 'null') ? image : defaultCover;
    let percentage = (isNaN(progress)) ? 0 : progress;
    percentage = this.state.seekActive ? (this.state.curAngle / 2) : percentage;

    console.log(this.props.player.position);

    return (
      <div className={style.wrapper} ref={this._seekBar} >
        <svg className={style.progressBar} >
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
              ((this.state.seekActive) ? (this.state.curAngle / 2) : percentage) * 360,
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

export default connect((state, props) => ({
  player: state.player,
  ...props,
}), {
  setPosition,
})(CircularAvatar);

CircularAvatar.propTypes = {
  progress: PropTypes.number,
  radius: PropTypes.number,
  time: PropTypes.string,
  image: PropTypes.string,
  setPosition: PropTypes.func,
};
