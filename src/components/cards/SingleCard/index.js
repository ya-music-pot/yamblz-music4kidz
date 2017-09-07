import React, { Component } from 'react';
import PropTypes from 'prop-types';

import getRandomInteger from '_helpers/randomNumber';
import CardTitle from '_components/cards/CardTitle';
import ButtonMiniplayer from '_components/ButtonMiniplayer';

import style from './style.styl';

export default class SingleCard extends Component {
  _handleCardClick = () => {
    const {
      data: { tracks, id: playlistId },
      callbacks: { onCardClick },
    } = this.props;

    if (
      typeof onCardClick === 'function'
      && Array.isArray(tracks) && tracks.length > 0
    ) {
      onCardClick(tracks[0].id, tracks, false, playlistId, this.props.isPlaying);
    }
  };

  _handleButtonClick = (e) => {
    e.stopPropagation();
    const {
      data: { tracks, id: playlistId },
      callbacks: { onButtonClick },
    } = this.props;

    if (
      typeof onButtonClick === 'function'
      && Array.isArray(tracks) && tracks.length > 0
    ) {
      onButtonClick(tracks[0].id, tracks, false, playlistId, this.props.isPlaying);
    }
  };

  render() {
    const {
      container, content, title,
      info, singer, button, overlay,
    } = style;

    const { bgs, data, isPlaying } = this.props;
    const {
      artist, name, image_url: imageUrl,
    } = data.tracks[0];

    const imageStyles = {};
    if (imageUrl) {
      imageStyles.backgroundImage = `url(${imageUrl})`;
    }

    const gradient = bgs.gradients[getRandomInteger(0, bgs.gradients.length - 1)];
    const backgroundStyles = { backgroundImage: `linear-gradient(${gradient})` };

    return (
      <div className={container} style={imageStyles} onClick={this._handleCardClick}>
        <div className={overlay} style={backgroundStyles} />
        <div className={content}>
          <CardTitle text="Модный трек" styles={title} />
          <div className={info}>
            <ButtonMiniplayer
              onClick={this._handleButtonClick}
              position={button}
              type="single"
              isPlaying={isPlaying}
            />
            <div>
              <div className={singer}>{artist}</div>
              <div>{name}</div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

SingleCard.propTypes = {
  data: PropTypes.object,
  callbacks: PropTypes.object,
  bgs: PropTypes.object,
  isPlaying: PropTypes.bool,
};
