import React, { Component } from 'react';
import PropTypes from 'prop-types';
import cl from 'classname';

import Icon from '_components/Icon';
import style from './style.styl';

export default class Achievement extends Component {
  render() {
    const {
      disabled, className, onClick,
      title, description,
    } = this.props;
    const text = disabled ? description : title;

    const typeIcon = disabled ? 'achievement-disabled' : this.props.typeIcon;

    return (
      <div className={cl(style.achievement, className)}>
        <Icon
          typeIcon={typeIcon}
          className={style.logo}
          onClick={onClick}
        />
        <div className={cl(style.title, disabled && style.titleDisabled)}>{text}</div>
      </div>
    );
  }
}

Achievement.propTypes = {
  typeIcon: PropTypes.string,
  title: PropTypes.string,
  description: PropTypes.string,
  disabled: PropTypes.bool,
  className: PropTypes.string,
  onClick: PropTypes.func,
};
