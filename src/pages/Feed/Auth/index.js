import React, { Component } from 'react';
import PropTypes from 'prop-types';

import ButtonVk from '_components/ButtonVk';
import style from './style.styl';

export default class Auth extends Component {
  render() {
    const {
      wrapper, lapakota, title,
      text, button,
    } = style;
    return (
      <div className={wrapper}>
        <div className={lapakota} />
        <div className={title}>Нужна авторизация</div>
        <div className={text}>
          Ты сможешь пользоваться личным радио,
          получать награды и&nbsp;многое другое!
        </div>
        <ButtonVk onClick={this.props.onClick} className={button} />
      </div>
    );
  }
}

Auth.propTypes = {
  onClick: PropTypes.func,
};
