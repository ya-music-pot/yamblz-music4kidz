import React, { Component } from 'react';
import PropTypes from 'prop-types';

import Button from '_components/Button';
import style from '../style.styl';

export default class Likes extends Component {
  render() {
    const {
      vote, buttonDislike, buttonLike,
    } = style;

    const { onLikeClick, onDislikeClick } = this.props;
    return (
      <div className={vote}>
        <Button style={buttonDislike} onClick={onDislikeClick} />
        <Button style={buttonLike} onClick={onLikeClick} />
      </div>
    );
  }
}

Likes.propTypes = {
  onLikeClick: PropTypes.func,
  onDislikeClick: PropTypes.func,
};
