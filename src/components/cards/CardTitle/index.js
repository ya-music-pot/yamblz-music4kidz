import React, { Component } from 'react';
import PropTypes from 'prop-types';
import cl from 'classname';

import style from './style.scss';

export default class CardTitle extends Component {
  render() {
    const { styles } = this.props;
    return (
      <h2 className={cl(style.title, styles)}>
        {this.props.text}
      </h2>
    );
  }
}

CardTitle.propTypes = {
  styles: PropTypes.string,
  text: PropTypes.string,
};
