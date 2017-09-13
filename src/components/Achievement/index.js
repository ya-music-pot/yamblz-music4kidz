import React, { Component } from 'react';
import PropTypes from 'prop-types';
import cl from 'classname';

import Icon from '_components/Icon';
import SvgIcon from '_components/SvgIcon';
import style from './style.styl';

export default class Achievement extends Component {
  renderSvgIcon(typeIcon, onClick) {
    return (
      <SvgIcon
        nameIcon={typeIcon}
        className={style.logo}
        onClick={onClick}
      />
    );
  }

  renderIcon(typeIcon, onClick) {
    return (
      <Icon
        typeIcon={typeIcon}
        className={style.logo}
        onClick={onClick}
      />
    );
  }

  render() {
    const { disabled, className, onClick } = this.props;

    const typeIcon = disabled ? 'achievement-disabled' : this.props.typeIcon;
    const title = disabled ? 'Тут задание' : this.props.title;

    return (
      <div className={cl(style.achievement, className)}>
        { disabled
          ? this.renderIcon(typeIcon, onClick)
          : this.renderSvgIcon(typeIcon, onClick)
        }
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
