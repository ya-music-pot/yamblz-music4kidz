import React, { Component } from 'react';
import PropTypes from 'prop-types';

import getRandomInteger from '_helpers/randomNumber';
import CardTitle from '_components/cards/CardTitle';
import ButtonMiniplayer from '_components/ButtonMiniplayer';

import style from './style.styl';

export default class CollectionCard extends Component {
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
      container, title,
      content, button, image,
    } = style;

    const {
      data: { name, image_url: imageUrl },
      bgs, isPlaying,
    } = this.props;


    const imageStyles = {};
    if (imageUrl) {
      imageStyles.backgroundImage = `url(${imageUrl})`;
    }

    const gradient = bgs.gradients[getRandomInteger(0, bgs.gradients.length - 1)];
    const backgroundStyles = { backgroundImage: `linear-gradient(${gradient})` };

    return (
      <div className={container} onClick={this._handleCardClick} style={backgroundStyles}>
        <div className={content}>
          <CardTitle text={name} styles={title} />
          <ButtonMiniplayer
            onClick={this._handleButtonClick}
            position={button}
            isPlaying={isPlaying}
          />
        </div>
        <div className={image} style={imageStyles}>image</div>
      </div>
    );
  }
}

CollectionCard.propTypes = {
  data: PropTypes.object,
  callbacks: PropTypes.object,
  bgs: PropTypes.object,
  isPlaying: PropTypes.bool,
};
