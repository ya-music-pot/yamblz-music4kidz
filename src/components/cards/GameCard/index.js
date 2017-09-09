import React, { Component } from 'react';
import PropTypes from 'prop-types';

import CardTitle from '_components/cards/CardTitle';
import ButtonMiniplayer from '_components/ButtonMiniplayer';

import style from './style.styl';

export default class GameCard extends Component {
  render() {
    const {
      container, title: titleStyles,
      image, button, buttonWrapper,
    } = style;

    const {
      data: { name, image_url: imageUrl },
      callbacks: { handleCardClick, handleButtonClick },
      isPlaying,
    } = this.props;

    const backgroundStyles = {};

    if (imageUrl) {
      backgroundStyles.backgroundImage = `url(${imageUrl})`;
    }

    return (
      <div className={container} onClick={handleCardClick}>
        <CardTitle text={name} styles={titleStyles} />
        <div className={buttonWrapper}>
          <ButtonMiniplayer
            onClick={handleButtonClick}
            position={button}
            type="game"
            isPlaying={isPlaying}
          />
        </div>
        <div className={image} style={backgroundStyles}>image</div>
      </div>
    );
  }
}

GameCard.propTypes = {
  data: PropTypes.object,
  callbacks: PropTypes.object,
  isPlaying: PropTypes.bool,
};
