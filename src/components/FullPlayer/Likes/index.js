import React, { Component } from 'react';
import PropTypes from 'prop-types';
import cl from 'classname';

import Button from '_components/Button';
import style from '../style.styl';

export default class Likes extends Component {
  render() {
    const {
      vote, buttonDislike, buttonLike,
      buttonDislikeDisabled,
    } = style;

    const { onLikeClick, onDislikeClick, dislikeDisabled } = this.props;
    return (
      <div className={vote}>
        <Button
          style={cl(
            buttonDislike,
            dislikeDisabled ? buttonDislikeDisabled : '',
          )}
          onClick={onDislikeClick}
        />
        <Button style={buttonLike} onClick={onLikeClick} />
      </div>
    );
  }
}

Likes.propTypes = {
  onLikeClick: PropTypes.func,
  onDislikeClick: PropTypes.func,
  dislikeDisabled: PropTypes.bool,
};
