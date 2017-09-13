import React, { Component } from 'react';
import PropTypes from 'prop-types';
import cl from 'classname';

import Button from '_components/Button';
import Icon from '_components/Icon';
import style from './style.styl';

export default class ButtonMiniplayer extends Component {
  renderButtonContent() {
    if (this.props.isPlaying) {
      return (
        <Icon
          typeIcon="pause-card"
        />
      );
    }

    switch (this.props.type) {
      case 'game':
        return (
          <Icon
            typeIcon="action-game"
            className={style.joystick}
          />
        );
      case 'single':
        return (
          <Icon
            typeIcon="play-card"
          />
        );
      default:
        return (
          <Icon
            typeIcon="play-card"
            className={style.play}
          />
        );
    }
  }

  render() {
    const { onClick, position, type } = this.props;
    const typeStyles = type === 'single' ?
      style.single :
      style.yellow;

    return (
      <Button
        onClick={onClick}
        style={cl(style.button, position, typeStyles)}
      >
        { this.renderButtonContent() }
      </Button>
    );
  }
}

ButtonMiniplayer.propTypes = {
  onClick: PropTypes.func.isRequired,
  position: PropTypes.string,
  type: PropTypes.string,
  isPlaying: PropTypes.bool,
};
