import React, { Component } from 'react';
import PropTypes from 'prop-types';
import cl from 'classname';

import style from './style.scss';

export default class GradientPerson extends Component {
  render() {
    const { image, className } = this.props;

    return (
      <div className={cl(style.container, className)} >
        <img
          src={image}
          alt="Singer"
          className={style.image}
        />
        <i className={style.grad1} />
        <i className={style.grad2} />
        <i className={style.grad3} />
      </div>
    );
  }
}

GradientPerson.propTypes = {
  image: PropTypes.string.isRequired,
  className: PropTypes.string,
};
