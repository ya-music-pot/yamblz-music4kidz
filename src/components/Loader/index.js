import React, { Component } from 'react';
import cl from 'classname';
import PropTypes from 'prop-types';

import style from './style.styl';

export default class Loader extends Component {
  render() {
    const { className } = this.props;
    return (
      <div className={cl(style.container, className)}>
        <div className={style.spinner}>
          <div className={style.bounce1} />
          <div className={style.bounce2} />
        </div>
      </div>
    );
  }
}

Loader.propTypes = {
  className: PropTypes.string,
};
