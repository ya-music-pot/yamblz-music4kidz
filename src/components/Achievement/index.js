import React, { Component } from 'react';
import PropTypes from 'prop-types';
import cl from 'classname';

import Icon from '_components/Icon';

import style from './style.styl';

export default class Achievement extends Component {
  render() {
    const { text, type, disabled } = this.props;

    return (
      <div className={cl(style.achievement, !disabled && style.achievementDiasbled)}>
        <Icon
          typeIcon={type}
          className={style.logo}
        />
        <p>{text}</p>
      </div>
    );
  }
}

Achievement.propTypes = {
  text: PropTypes.string,
  type: PropTypes.string,
  disabled: PropTypes.bool,
};
