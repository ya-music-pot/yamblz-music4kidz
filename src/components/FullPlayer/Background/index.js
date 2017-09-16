import React, { Component } from 'react';
import PropTypes from 'prop-types';
import style from './style.styl';

import defaultBackground from './images/default.jpg';

export default class Background extends Component {
  render() {
    const { cover } = this.props;
    const imageUri = (cover !== 'null') ? cover : defaultBackground;

    return (
      <div className={style.wrapper}>
        <div className={style.overlay}/>
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
