import React, { Component } from 'react';
import PropTypes from 'prop-types';
import style from './style.scss';

import twitterImage from './images/twitter.svg';

export default class Example extends Component {
  render() {
    return (
      <div>
        <span className={style.container}>Пример использования css</span>
        <br />
        <img
          src={twitterImage}
          alt="Твиттер"
          className={style.image}
        />
      </div>
    );
  }
}

Example.propTypes = {};
