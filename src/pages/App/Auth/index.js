import React, { Component } from 'react';

import ButtonVk from '_components/ButtonVk';
import style from './style.styl';

export default class Auth extends Component {
  _onButtonClick = () => {};

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
          Ты&nbsp;сможешь пользоваться личным радио,
          получать награды и&nbsp;многое другое!
        </div>
        <ButtonVk onClick={this._onButtonClick} className={button} />
      </div>
    );
  }
}
