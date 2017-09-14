import React, { Component } from 'react';
import PropTypes from 'prop-types';
import cl from 'classname';

import style from './style.styl';

export default class Icon extends Component {
  render() {
    const { typeIcon, className, onClick } = this.props;

    return (
      <svg
        className={cl(style.icon, style[typeIcon], className)}
        onClick={onClick}
      >
        <use xlinkHref={`#icon-${typeIcon}`} />
      </svg>
    );
  }
}

Icon.propTypes = {
  typeIcon: PropTypes.string.isRequired,
  onClick: PropTypes.func,
  className: PropTypes.string,
};
