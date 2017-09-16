import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { playerModeUpdate } from '_actions/playerInfo';
import cl from 'classname';

import style from './style.styl';

class PlayerToggle extends Component {
  _toFullPlayer = () => {
    this.props.playerModeUpdate('full');
  }

  _toMiniPlayer = () => {
    this.props.playerModeUpdate('mini');
  }

  _containerShift = () => {
    const mode = this.props.playerInfo.mode;
    const shift = (mode === 'full') ? -window.innerHeight : 0;
    return {
      transform: `translateY(${shift}px) translateZ(0)`,
    };
  }

  render() {
    const mode = this.props.playerInfo.mode;

    return (
      <div className={cl(style.container)}
        style={this._containerShift()}>
        {
          this.props.children.map((child) =>
            React.cloneElement(child, {
              key: child.props.type,
              openMiniPlayer: this._toMiniPlayer,
              openFullPlayer: this._toFullPlayer,
            }))
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
