import React, { Component } from 'react';
import PropTypes from 'prop-types';
import cl from 'classname';

import Icon from '_components/Icon';
import style from './style.styl';

export default class Achievement extends Component {
  render() {
    const {
      title, typeIcon, disabled,
      className,
    } = this.props;

    return (
      <div className={cl(style.achievement, className, disabled && style.achievementDisabled)}>
        <Icon
          typeIcon={typeIcon}
          className={style.logo}
        />
        <div className={style.title}>{title}</div>
      </div>
    );
  }
}

Achievement.propTypes = {
  typeIcon: PropTypes.string,
  title: PropTypes.string,
  disabled: PropTypes.bool,
  className: PropTypes.string,
};
