import React, { Component } from 'react';
import PropTypes from 'prop-types';
import cl from 'classname';

import Button from '_components/Button';
import Icon from '_components/Icon';

import style from './style.scss';


export default class ButtonMiniplayer extends Component {
  render() {
    const { onClick, position } = this.props;

    return (
      <Button onClick={onClick} style={cl(style.button, position)}>
        <Icon typeIcon="play-card" />
      </Button>
    );
  }
}

ButtonMiniplayer.propTypes = {
  onClick: PropTypes.func.isRequired,
  position: PropTypes.string,
};
