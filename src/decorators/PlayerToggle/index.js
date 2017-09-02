import React, { Component } from 'react';
import PropTypes from 'prop-types';
import cl from 'classname';
import Hammer from 'hammerjs';

import style from './style.scss';

export default class PlayerToggle extends Component {
  state = {
    currentPlayer: 'mini',
    slideTransform: document.body.clientWidth,
  };

  componentDidMount() {
    this._initToggle();
  }

  _initToggle() {
    const { children } = this.props;
    this.hammer = Hammer(this.toggleNode);

    console.log("_initSlider");

    this.hammer.on('tap', this._toFullPlayer);
    this.hammer.on('swiperight', this._toMiniPlayer);
  }

  _toFullPlayer = () => {
    this.setState({
      currentPlayer: 'full'
    });
    this._slide(-document.body.clientWidth);
    console.log('Changed to FullPlayer');
  }

  _toMiniPlayer = () => {
    this.setState({
      currentPlayer: 'mini'
    });
    this._slide(document.body.clientWidth);
    console.log('Changed to MiniPlayer');
  }

  _slide = (dx) => {
    console.log(dx);

    return {
      transform: `translateX(${this.state.slideTransform}px)`,
    };
  }

  _saveToggle = (target) => {
    this.toggleNode = target;
  }

  render() {
    const { className } = this.props;

    return (
      <div
        className={style.container}
        ref={this._saveToggle}
        style={this._slide()}
      >
        { this.props.children.map((child) => (
          <div className={style.slide} key={child.props.id}>
            { child }
          </div>
        ))}
      </div>
    );
  }
}

PlayerToggle.propTypes = {
  children: PropTypes.arrayOf(PropTypes.node),
};
