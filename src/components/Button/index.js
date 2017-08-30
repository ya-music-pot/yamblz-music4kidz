import React, { Component } from 'react';
import PropTypes from 'prop-types';
import cl from 'classname';

import styles from './style.scss';

export default class Button extends Component {
  render() {
    const { onClick, children, style } = this.props;
    return (
      <button
        className={cl(styles.buttonCommon, style)}
        onClick={onClick}
      >
        {children}
      </button>);
  }
}

Button.propTypes = {
  style: PropTypes.string,
  onClick: PropTypes.func.isRequired,
  children: PropTypes.oneOfType([
    PropTypes.arrayOf(PropTypes.node),
    PropTypes.node,
  ]),
};
