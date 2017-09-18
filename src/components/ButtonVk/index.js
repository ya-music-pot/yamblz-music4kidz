import React, { Component } from 'react';
import PropTypes from 'prop-types';
import cl from 'classname';

import Icon from '_components/Icon';
import Button from '_components/Button';

import style from './style.styl';

export default class ButtonVk extends Component {
  render() {
    return (
      <Button
        style={cl(style.button, this.props.className)}
        onClick={this.props.onClick}
      >
        <Icon typeIcon="vk" className={style.vkIcon} />
        Войти
      </Button>
    );
  }
}

ButtonVk.propTypes = {
  onClick: PropTypes.func,
  className: PropTypes.string,
};
