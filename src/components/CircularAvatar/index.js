import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Button from '_components/Button';
import style from './style.scss';

export default class CircularAvatar extends Component {

  _polarToCartesian = (centerX, centerY, radius, angleInDegrees) => {
    let angleInRadians = (angleInDegrees - 90) * Math.PI / 180.0;

    return {
      x: centerX + (radius * Math.cos(angleInRadians)),
      y: centerY + (radius * Math.sin(angleInRadians))
    };
  }

  _describeArc = (x, y, radius, startAngle, endAngle) => {
      let start = this._polarToCartesian(x, y, radius, endAngle),
          end = this._polarToCartesian(x, y, radius, startAngle),
          largeArcFlag = endAngle - startAngle <= 180 ? "0" : "1";

      return [
          "M", start.x, start.y,
          "A", radius, radius, 0, largeArcFlag, 0, end.x, end.y
      ].join(" ");
  }

  render() {
    const { progress, image, radius } = this.props;

    return (
      <div className = {style.wrapper}>
        <svg className = {style.progressBar}>
        <defs>
            <linearGradient id = "linear-gradient" x2 = "0%" y2 = "100%">
                <stop offset = "5%"  stopColor = "#ffde5a"/>
                <stop offset = "95%" stopColor = "#5fcef9"/>
            </linearGradient>
        </defs>
          <path d = {this._describeArc(
            document.documentElement.clientHeight * radius,
            document.documentElement.clientHeight * radius,
            document.documentElement.clientHeight * radius,
            0,
            progress * 360
          )} stroke = "url(#linear-gradient)" strokeWidth = "11" />
        </svg>
        <img
          src = {image}
          className = {style.circularImage}
        />
      </div>
    );
  }
}

CircularAvatar.propTypes = {
  progress: React.PropTypes.number,
  image: React.PropTypes.string,
  style: React.PropTypes.string,
};
