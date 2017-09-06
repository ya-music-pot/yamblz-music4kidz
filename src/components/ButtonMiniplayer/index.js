import React, { Component } from 'react';
import PropTypes from 'prop-types';
import cl from 'classname';

import Button from '_components/Button';
import Icon from '_components/Icon';
import style from './style.styl';


export default class ButtonMiniplayer extends Component {
  renderButtonContent(type) {
    if (type === 'game') {
      return (
        <Icon
          typeIcon="action-game"
          className={style.joystick}
        />
      );
    }

    return (
      <Icon
        typeIcon="play-card"
        className={style.play}
      />
    );
  }

  renderButtonStyle(type) {
    if (type === 'single') {
      return style.single;
    }
    return style.yellow;
  }

  render() {
    const { onClick, position, type } = this.props;

    return (
      <Button
        onClick={onClick}
        style={cl(style.button, position, this.renderButtonStyle(type))}
      >
        { this.renderButtonContent(type) }
      </Button>
    );
  }
}

ButtonMiniplayer.propTypes = {
  onClick: PropTypes.func.isRequired,
  position: PropTypes.string,
  type: PropTypes.string,
};
