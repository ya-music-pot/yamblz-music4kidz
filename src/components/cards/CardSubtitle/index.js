import React, { Component } from 'react';
import PropTypes from 'prop-types';

import style from './style.scss';

export default class CardSubtitle extends Component {

  render() {
    return (
      <div className={style.subtitle}>
        {this.props.text}
      </div>
    );
  }
}

CardSubtitle.propTypes = {
  text: PropTypes.string,
};
