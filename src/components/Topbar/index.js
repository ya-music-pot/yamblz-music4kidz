import React, { Component } from 'react';
import PropTypes from 'prop-types';
import cl from 'classname';
import Avatar from '_components/Avatar';

import style from './style.styl';

export default class Topbar extends Component {
  render() {
    const { onClick, user } = this.props;

    return (
      <div className={style.topbar}>
        {user.id &&
          <Avatar
            onClick={onClick}
            avatar={user.avatarUrl}
            className={cl(user.avatarUrl && style.avatarCover)}
          />}
      </div>
    );
  }
}

Topbar.propTypes = {
  onClick: PropTypes.func,
  user: PropTypes.object,
};

