import React, { Component } from 'react';
import PropTypes from 'prop-types';
import cl from 'classname';
import Hammer from 'hammerjs';

import style from './style.styl';

const WIDTH_SLIDE = 0.70; // 70% from width;

export default class Slider extends Component {
  state = {
    slidesLength: null,
    currentId: 0,
    slideTransform: document.body.clientWidth * (1 - WIDTH_SLIDE) / 2,
  };

  componentDidMount() {
    this._initSlider();
  }

  _initSlider() {
    const { currentId, children } = this.props;
    this.hammer = Hammer(this.sliderNode);

    this.setState({
      currentId: currentId || 0,
      slidesLength: children.length,
    });

    this.hammer.on('swipeleft', this._toNext);
    this.hammer.on('swiperight', this._toPrev);
  }

  _toNext = () => {
    const { slidesLength, currentId } = this.state;
    const newCurrentId = currentId + 1;
    if (newCurrentId > slidesLength - 1) return;

    this._updateCurrentId(newCurrentId);
  }

  _toPrev = () => {
    const { currentId } = this.state;
    const newCurrentId = currentId - 1;
    if (newCurrentId < 0) return;

    this._updateCurrentId(newCurrentId);
  }

  _updateCurrentId(currentId) {
    this.props.onChange(currentId);
    this.setState({
      currentId,
      slideTransform: getShiftSlides(WIDTH_SLIDE, currentId),
    });
  }

  _saveSlider = (target) => {
    this.sliderNode = target;
  }

  _getStylesShift() {
    return {
      transform: `translateX(${this.state.slideTransform}px)`,
    };
  }

  render() {
    const { className } = this.props;

    return (
      <div className={style.container}>
        <div
          className={cl(className, style.slider)}
          ref={this._saveSlider}
          style={this._getStylesShift()}
        >
          { this.props.children.map((child) => (
            <div className={style.slide} key={child.props.id}>
              { child }
            </div>
          ))}
        </div>
        <div className={style.prev} onClick={this._toPrev} />
        <div className={style.next} onClick={this._toNext} />
      </div>
    );
  }
}

Slider.propTypes = {
  currentId: PropTypes.number,
  className: PropTypes.string,
  onChange: PropTypes.func,
  children: PropTypes.arrayOf(PropTypes.node),
};

/**
 * Helpers
 */

function getShiftSlides(width, slideId) {
  const docWidth = document.body.clientWidth;
  return docWidth * ((1 - width) / 2 - slideId * width);
}
