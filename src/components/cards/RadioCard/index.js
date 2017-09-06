import React, { Component } from 'react';
import PropTypes from 'prop-types';
import cl from 'classname';

import getRandomInteger from '_helpers/randomNumber';
import CardTitle from '_components/cards/CardTitle';
import CardSubtitle from '_components/cards/CardSubtitle';
import ButtonMiniplayer from '_components/ButtonMiniplayer';

import style from './style.styl';

export default class RadioCard extends Component {
  _handleCardClick = () => {
    console.log('RadioCard');
    const {
      data: { tracks },
      callbacks: { onCardClick },
    } = this.props;

    if (
      typeof onCardClick === 'function'
      && Array.isArray(tracks) && tracks.length > 0
    ) {
      onCardClick(tracks[0].id, tracks, true);
    }
  };

  _generateBackground() {
    const bgs = ['282d32', '3a5272', '413d72'];
    const color = bgs[getRandomInteger(0, 2)];
    return { backgroundColor: `#${color}` };
  }

  render() {
    const {
      container, title, circle,
      subtitle, image, button,
      circleL, circleM, circleS,
      imageContainer,
    } = style;

    const {
      data: { name, image_url: imageUrl },
      callbacks: { onButtonClick },
    } = this.props;

    const imageStyles = {};

    if (imageUrl) {
      imageStyles.backgroundImage = `url(${imageUrl})`;
    }

    const backgroundStyles = this._generateBackground();

    return (
      <div style={backgroundStyles} className={container} onClick={this._handleCardClick}>
        <CardTitle text={name} styles={title} />
        <CardSubtitle text="Радио исполнителя" styles={subtitle} />
        <div className={imageContainer}>
          <div className={cl(circle, circleL)} />
          <div className={cl(circle, circleM)} />
          <div className={cl(circle, circleS)} />
          <div className={image} style={imageStyles} />
        </div>
        <ButtonMiniplayer onClick={onButtonClick} position={button} />
      </div>
    );
  }
}

RadioCard.propTypes = {
  data: PropTypes.object,
  callbacks: PropTypes.object,
};
