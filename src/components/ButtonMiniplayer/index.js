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
      default:
        return (
          <Icon
            typeIcon="play-card"
            className={style.play}
          />
        );
    }
  }

  renderButtonStyle() {
    if (this.props.type === 'single') {
      return style.single;
    }
    return style.yellow;
  }

  render() {
    const { onClick, position } = this.props;

    return (
      <Button
        onClick={onClick}
        style={cl(style.button, position, this.renderButtonStyle())}
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
