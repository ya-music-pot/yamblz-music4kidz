import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import ReactDOM from 'react-dom';
import Hammer from 'hammerjs';
import { playerModeUpdate } from '_actions/playerInfo';

import style from './style.styl';

class PlayerToggle extends Component {
  state = {
    currentPlayer: 'mini',
    slideTransform: 0,
  };

  componentDidMount() {
    this._initToggle();
  }

  componentWillReceiveProps(nextProps) {
    if ((nextProps.playerInfo.mode === 'full') && (this.state.currentPlayer === 'mini')) {
      this.props.playerModeUpdate('full');
      this.setState({
        currentPlayer: 'full',
        slideTransform: -window.innerHeight,
      });
    } else if ((nextProps.playerInfo.mode === 'mini') && (this.state.currentPlayer === 'full')) {
      this.props.playerModeUpdate('mini');
      this.setState({
        currentPlayer: 'mini',
        slideTransform: 0,
      });
    }
  }

  _initToggle() {
    this.hammerMiniPlayer = Hammer(ReactDOM.findDOMNode(this.refs['item-0']));
    this.hammerFullPlayer = Hammer(ReactDOM.findDOMNode(this.refs['item-1']));

    this.hammerMiniPlayer.domEvents = true;
    this.hammerFullPlayer.get('swipe').set({ direction: Hammer.DIRECTION_VERTICAL });

    this.hammerMiniPlayer.on('tap', this._toFullPlayer);
    this.hammerFullPlayer.on('swipedown', this._toMiniPlayer);
  }

  _toFullPlayer = (e) => {
    e.srcEvent.stopPropagation();
    if (e.srcEvent.srcElement.nodeName !== 'BUTTON') {
      this.setState({
        currentPlayer: 'full',
        slideTransform: -window.innerHeight,
      });
    }
    this.props.playerModeUpdate(this.state.currentPlayer);
  }

  _toMiniPlayer = () => {
    this.setState({
      currentPlayer: 'mini',
      slideTransform: 0,
    });
    this.props.playerModeUpdate(this.state.currentPlayer);
  }

  _slide() {
    return {
      transform: `translateY(${this.state.slideTransform}px)`,
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
              key: child.props.type,
            },
            ))
        }
      </div>
    );
  }
}

PlayerToggle.propTypes = {
  children: PropTypes.arrayOf(PropTypes.node),
  playerModeUpdate: PropTypes.func,
  playerInfo: PropTypes.shape({
    mode: PropTypes.string,
  }),
};

export default connect((state, props) => ({
  playerInfo: state.playerInfo,
  ...props,
}), {
  playerModeUpdate,
})(PlayerToggle);
