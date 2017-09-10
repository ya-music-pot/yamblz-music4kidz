import React, { Component } from 'react';
// import PropTypes from 'prop-types';

import Button from '_components/Button';
import style from '../style.styl';

export default class Likes extends Component {
  _handleClickDislike = () => {};

  _handleClickLike = () => {};

  render() {
    const {
      vote, buttonDislike, spacer,
      buttonLike,
    } = style;
    return (
      <div className={vote}>
        <Button style={buttonDislike} onClick={this._handleClickDislike} />
        <div className={spacer} />
        <Button style={buttonLike} onClick={this._handleClickLike} />
      </div>
    );
  }
}

Likes.propTypes = {};
