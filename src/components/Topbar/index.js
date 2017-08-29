import React, { Component } from 'react';

import Avatar from '_components/Avatar';

import style from './style.scss';

export default class Topbar extends Component {
  render() {
    return (
      <div className={style.topbar}>
        <Avatar />
      </div>
    );
  }
}

Topbar.propTypes = {};
