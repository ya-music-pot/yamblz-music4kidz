import React, { Component } from 'react';
import PropTypes from 'prop-types';
import cl from 'classname';
import plural from 'plural-ru';

import Avatar from '_components/Avatar';

import style from './style.styl';

export default class Header extends Component {
  render() {
    const { avatar, userName, className } = this.props;

    return (
      <div className={cl(style.header, style[className])}>
        <div className={cl(style.button, style.buttonBack)} />
        <div className={cl(style.button, style.buttonSettings)} />
        <Avatar
          className={style.avatar}
          avatar={avatar}
        />
        <div className={style.userName}>
          {userName}
        </div>
        <div className={style.totalScore}>
          {plural(8, '%d награда', '%d награды', '%d наград')}
        </div>
      </div>
    );
  }
}

Header.propTypes = {
  avatar: PropTypes.string,
  userName: PropTypes.string,
  className: PropTypes.string,
};
