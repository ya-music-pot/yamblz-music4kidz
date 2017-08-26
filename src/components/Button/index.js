import React, { Component } from 'react';
import PropTypes from 'prop-types';

export default class Button extends Component {
  render() {
    const { onClick, label, style } = this.props;
    return (
      <button
        className={style}
        onClick={onClick}
      >
        {label}
      </button>);
  }
}

Button.propTypes = {
  style: React.PropTypes.string,
  onClick: React.PropTypes.function,
  label: React.PropTypes.string,
};
