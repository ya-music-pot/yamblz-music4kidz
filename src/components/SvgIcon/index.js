import React, { Component } from 'react';
import PropTypes from 'prop-types';
import cl from 'classname';

import style from './style.styl';

class SvgIcon extends Component {
  render() {
    const { name, className } = this.props;

    return (
      <svg className={cl(style.icon, style[name], className)}>
        <use xlinkHref={`#icon-${name}`} />
      </svg>
    );
  }
}

SvgIcon.propTypes = {
  name: PropTypes.string.isRequired,
  className: PropTypes.string,
};

export default SvgIcon;
