import React, { Component } from 'react';
import PropTypes from 'prop-types';
import style from './style.styl';

import defaultImage from './images/egorka.jpg';

export default class Background extends Component {
  render() {
    const { cover } = this.props;
    const imageUri = (cover !== '') ? cover : defaultImage;

    return (
      <div className={style.wrapper}>
        <div className={style.overlay} />
        <img
          src={imageUri}
          className={style.backgroundImage}
          alt="Аватар"
        />
      </div>
    );
  }
}

Background.propTypes = {
  cover: PropTypes.string,
};
