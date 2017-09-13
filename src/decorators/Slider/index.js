import React, { Component } from 'react';
import PropTypes from 'prop-types';
import cl from 'classname';
import Hammer from 'hammerjs';

import style from './style.styl';

export default class Slider extends Component {
  componentWillMount() {
    const { widthSlide, minTransform, maxTransform } = this.props;
    let { initTransform } = this.props;

    const WIDTH_SLIDE = 0.7 * document.body.clientWidth; // 70% from width;

    this.widthSlide = widthSlide || WIDTH_SLIDE;
    this.maxTransform = maxTransform;
    this.minTransform = minTransform;

    if (typeof initTransform === 'undefined') {
      initTransform = (document.body.clientWidth - this.widthSlide) / 2;
    }

    this.setState({
      slidesLength: null,
      currentId: 0,
      slideTransform: initTransform,
    });
  }

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
    const { onChange } = this.props;

    if (typeof onChange === 'function') {
      onChange(currentId);
    }

    this.setState({
      currentId,
      slideTransform: this._getShiftSlides(this.widthSlide, currentId),
    });
  }

  _getShiftSlides = (width, slideId) => {
    const docWidth = document.body.clientWidth;
    let transform = docWidth / 2 - slideId * width - width / 2;

    if (transform > this.maxTransform) {
      transform = this.maxTransform;
    }
    if (transform < this.minTransform) {
      transform = this.minTransform;
    }

    return transform;
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
  widthSlide: PropTypes.number,

  initTransform: PropTypes.number,
  minTransform: PropTypes.number,
  maxTransform: PropTypes.number,

  className: PropTypes.string,
  // TODO: required
  onChange: PropTypes.func,
  children: PropTypes.arrayOf(PropTypes.node),
};

