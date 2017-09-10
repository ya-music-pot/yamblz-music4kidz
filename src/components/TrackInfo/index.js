import React, { Component } from 'react';
import PropTypes from 'prop-types';
import cl from 'classname';

import Loader from '_components/Loader';
import Icon from '_components/Icon';

import style from './style.styl';

export default class TrackInfo extends Component {
  _onClick = () => {
    const { onClick, trackId } = this.props;
    onClick(trackId);
  }

  renderImageDefault() {
    return (
      <Icon typeIcon="bird" className={style.icon} />
    );
  }

  renderImage() {
    const { imageUrl, name } = this.props;

    return (
      <img
        className={style.image}
        src={imageUrl}
        alt={name}
      />
    );
  }

  render() {
    const {
      name, artist, imageUrl,
      className, currentTrack, isPlaying,
    } = this.props;

    return (
      <div
        className={cl(style.container, className, currentTrack && style.active)}
        onClick={this._onClick}
      >
        <div className={style.imageWrapper}>
          {
            imageUrl && imageUrl !== 'null'
              ? this.renderImage()
              : this.renderImageDefault()
          }
          { isPlaying && <Loader className={style.loader} />}
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
  imageUrl: PropTypes.string,
  name: PropTypes.string,
  currentTrack: PropTypes.bool,
  isPlaying: PropTypes.bool,
  artist: PropTypes.string,
  onClick: PropTypes.func,
  trackId: PropTypes.number,
};

