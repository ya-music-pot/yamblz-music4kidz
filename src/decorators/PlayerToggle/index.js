import React, { Component } from 'react';
import PropTypes from 'prop-types';
import ReactDOM from 'react-dom';
import cl from 'classname';
import Hammer from 'hammerjs';

import style from './style.styl';

export default class PlayerToggle extends Component {
  state = {
    currentPlayer: 'mini',
    slideTransform: 0,
  };

  componentDidMount() {
    this._initToggle();
  }

  _initToggle() {
    const { children } = this.props;
    this.hammerMiniPlayer = Hammer(ReactDOM.findDOMNode(this.refs['item-0']));
    this.hammerFullPlayer = Hammer(ReactDOM.findDOMNode(this.refs['item-1']));

    this.hammerMiniPlayer.on('tap', this._toFullPlayer);
    this.hammerFullPlayer.on('swiperight', this._toMiniPlayer);
  }

  _toFullPlayer = (ev) => {
    this.setState({
      currentPlayer: 'full',
      slideTransform: -document.body.clientWidth,
    });
  }

  _toMiniPlayer = (ev) => {
    this.setState({
      currentPlayer: 'mini',
      slideTransform: 0,
    });
  }

  _slide = () => {
    console.log(this.state.currentPlayer, this.toggleNode);
    return {
      transform: `translateX(${this.state.slideTransform}px)`,
    };
  }

  _saveToggle = (target) => {
    console.log("target", target);
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
        {
          this.props.children.map((child, iter) => {
              return React.cloneElement(child, {
                  ref: `item-${iter}`
              });
          })
        }
      </div>
    );
  }
}

PlayerToggle.propTypes = {
  children: PropTypes.arrayOf(PropTypes.node),
};
