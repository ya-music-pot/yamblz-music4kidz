import React, { Component } from 'react';
import PropTypes from 'prop-types';

export default class Button extends Component {
  render() {
    const { onClick } = this.props;
    const { label } = this.props;
    return(
        <button
          className={this.props.style}
          onClick={onClick}
        >
          {label}
        </button>)
  }
}

Button.propTypes = {
  style: React.PropTypes.string
};
