import React, { Component } from 'react';
import style from './style.scss';

import Avatar from '_components/Avatar';

export default class Topbar extends Component {
  render() {
    return (
      <div>
        <Avatar />
      </div>
    );
  }
}

Topbar.propTypes = {};
