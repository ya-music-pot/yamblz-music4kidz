import React, { Component } from 'react';
import PropTypes from 'prop-types';
import style from './style.scss';

import defaultImage from './images/egorka.png';

export default class Background extends Component {
  render() {
    const { cover } = this.props;
    const imageUri = (cover !== '') ? cover : defaultImage;

    return (
      <div>
        <div
          className={style.overlay}
        />
        <img
          src={imageUri}
          className={style.backgroundImage}
        />
      </div>
    );
  }
}

Background.propTypes = {};
