import React, { Component } from 'react';
import PropTypes from 'prop-types';
import cl from 'classname';

import Icon from '_components/Icon';

import style from './style.scss';

export default class ButtonNext extends Component {
  render() {
    const { onClick, className } = this.props;

    return (
      <div className={cl(style.circle, className)} onClick={onClick}>
        <Icon typeIcon="arrow-right" className={style.icon} />
      </div>
    );
  }
}

ButtonNext.propTypes = {
  onClick: PropTypes.func,
  className: PropTypes.string,
};
