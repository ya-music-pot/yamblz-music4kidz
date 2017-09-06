import React, { Component } from 'react';
import PropTypes from 'prop-types';
import cl from 'classname';

import style from './style.styl';

export default class Header extends Component {
  render() {
    const { avatar, userName } = this.props;

    return (
      <div className={style.header}>
        <div className={cl(style.button, style.buttonBack)} />
        <div className={cl(style.button, style.buttonSettings)} />
        <img
          src={avatar}
          alt="avatar"
          className={style.avatar}
        />
        <div className={style.userName}>
          {userName}
        </div>
      </div>
    );
  }
}

Header.propTypes = {
  avatar: PropTypes.string,
  userName: PropTypes.string,
};
