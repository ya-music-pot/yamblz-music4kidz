import React, { Component } from 'react';
import PropTypes from 'prop-types';
import style from './style.scss';

import backgroundImage from './images/egorka.png';

export default class Background extends Component {
  render() {
    return (
      <div>
        <div
          className={style.overlay}
        />
        <img
          src={backgroundImage}
          className={style.backgroundImage}
        />
      </div>
    );
  }
}

Background.propTypes = {};
