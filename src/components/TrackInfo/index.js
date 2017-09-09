import React, { Component } from 'react';
import PropTypes from 'prop-types';
import cl from 'classname';

import Icon from '_components/Icon';

import style from './style.styl';

export default class TrackInfo extends Component {
  renderImageDefault() {
    return (
      <Icon typeIcon="bird" className={style.icon} />
    );
  }

  renderImage() {
    const { image_url, name } = this.props;

    return (
      <img
        className={style.image}
        src={image_url}
        alt={name}
      />
    );
  }

  render() {
    const {
      name, artist, image_url,
      className,
    } = this.props;

    return (
      <div className={cl(style.container, className)}>
        <div className={style.imageWrapper}>
          {
            image_url && image_url !== 'null'
              ? this.renderImage()
              : this.renderImageDefault()
          }
        </div>
        <hgroup>
          <h3 className={style.mainTitle}>{name}</h3>
          <h4 className={style.subTitle}>{artist}</h4>
        </hgroup>
      </div>
    );
  }
}

TrackInfo.propTypes = {
  className: PropTypes.string,
  image_url: PropTypes.string,
  name: PropTypes.string,
  artist: PropTypes.string,
};

