import React, { Component } from 'react';
import PropTypes from 'prop-types';

import getRandomInteger from '_helpers/randomNumber';
import CardTitle from '_components/cards/CardTitle';
import ButtonMiniplayer from '_components/ButtonMiniplayer';

import style from './style.styl';

export default class SingleCard extends Component {
  _handleCardClick = () => {
    const {
      data: { tracks },
      callbacks: { onCardClick },
    } = this.props;

    if (
      typeof onCardClick === 'function'
      && Array.isArray(tracks) && tracks.length > 0
    ) {
      onCardClick(tracks[0].id, tracks);
    }
  };

  render() {
    const {
      container, content, title,
      info, singer, button, overlay,
    } = style;

    const {
      callbacks: { onButtonClick }, bgs, data,
    } = this.props;
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
            <ButtonMiniplayer onClick={onButtonClick} position={button} type="single" />
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
};
