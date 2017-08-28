import React, { Component } from 'react';

import style from './style.scss';

export default class EmojiStatus extends Component {
  render() {
    const { container } = style;

    return (
      <div className={container}>
        <span>mood</span>
        <span>activity</span>
      </div>
    );
  }
}

EmojiStatus.propTypes = {};