import React, { Component } from 'react';
import PropTypes from 'prop-types';

import style from './style.scss';

export default class EmojiStatus extends Component {
  render() {
    const { container } = style;
    const { status: { mood, activity } } = this.props;

    return (
      <div className={container}>
        <span>{mood}</span>
        <span>{activity}</span>
      </div>
    );
  }
}

EmojiStatus.propTypes = {
  status: PropTypes.object,
};