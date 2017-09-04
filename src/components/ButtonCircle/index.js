import React, { Component } from 'react';
import PropTypes from 'prop-types';
import cl from 'classname';

import Icon from '_components/Icon';

import style from './style.styl';

export default class ButtonCircle extends Component {
  render() {
    const {
      onClick, className, typeIcon,
      background,
    } = this.props;

    const customStyle = {
      backgroundColor: background,
    };

    return (
      <div
        className={cl(style.circle, className)}
        style={customStyle}
        onClick={onClick}
      >
        { typeIcon && <Icon typeIcon={typeIcon} className={style.icon} /> }
      </div>
    );
  }
}

ButtonCircle.propTypes = {
  onClick: PropTypes.func,
  typeIcon: PropTypes.string,
  background: PropTypes.string,
  className: PropTypes.string,
};
