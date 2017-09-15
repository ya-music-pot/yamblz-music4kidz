import React, { Component } from 'react';
import PropTypes from 'prop-types';
import cl from 'classname';

import Icon from '_components/Icon';
import style from './style.styl';

export default class Achievement extends Component {
  render() {
    const { disabled, className, onClick } = this.props;

    const typeIcon = disabled ? 'achievement-pop' : this.props.typeIcon;
    const title = disabled ? 'Тут задание' : this.props.title;

    return (
      <div className={cl(style.achievement, className)}>
        { disabled && (
          <Icon
            typeIcon={typeIcon}
            className={style.logo}
            onClick={onClick}
          />
        )}
        <div className={cl(style.title, disabled && style.titleDisabled)}>{title}</div>
      </div>
    );
  }
}

Achievement.propTypes = {
  typeIcon: PropTypes.string,
  title: PropTypes.string,
  disabled: PropTypes.bool,
  className: PropTypes.string,
  onClick: PropTypes.func,
};
