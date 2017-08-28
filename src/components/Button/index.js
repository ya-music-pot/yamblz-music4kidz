import React, { Component } from 'react';
import PropTypes from 'prop-types';
import cl from 'classname';

import styles from './style.scss';

export default class Button extends Component {
  render() {
    const { onClick, label, style } = this.props;
    return (
      <button
        className={cl(styles.buttonCommon, style)}
        onClick={onClick}
      >
        {label}
      </button>);
  }
}

Button.propTypes = {
  style: PropTypes.string,
  onClick: PropTypes.func.isRequired,
  label: PropTypes.string,
};
