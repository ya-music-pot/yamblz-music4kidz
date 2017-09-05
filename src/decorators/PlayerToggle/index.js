import React, { Component } from 'react';
import PropTypes from 'prop-types';
import ReactDOM from 'react-dom';
import Hammer from 'hammerjs';

import style from './style.styl';

export default class PlayerToggle extends Component {
  state = {
    currentPlayer: 'mini',
    slideTransform: 0,
    topPadding: '',
  };

  componentDidMount() {
    this._initToggle();
  }

  _initToggle() {
    this.hammerMiniPlayer = Hammer(ReactDOM.findDOMNode(this.refs['item-0']));
    this.hammerFullPlayer = Hammer(ReactDOM.findDOMNode(this.refs['item-1']));

    this.hammerMiniPlayer.on('tap', this._toFullPlayer);
    this.hammerFullPlayer.on('swiperight', this._toMiniPlayer);
  }

  _toFullPlayer = () => {
    this.setState({
      currentPlayer: 'full',
      slideTransform: -document.body.clientWidth,
      topPadding: 0,
    });
  }

  _toMiniPlayer = () => {
    this.setState({
      currentPlayer: 'mini',
      slideTransform: 0,
    });
    setTimeout(() => {
      this.setState({
        topPadding: '',
      });
    }, 500);
  }

  _slide() {
    return {
      transform: `translateX(${this.state.slideTransform}px)`,
      top: `${this.state.topPadding}`,
    };
  }

  render() {
    return (
      <div
        className={style.container}
        style={this._slide()}
      >
        {
          this.props.children.map((child, iter) =>
            React.cloneElement(child, {
              ref: `item-${iter}`,
              key: child.props.key,
            },
            ))
        }
      </div>
    );
  }
}

PlayerToggle.propTypes = {
  children: PropTypes.arrayOf(PropTypes.node),
};
