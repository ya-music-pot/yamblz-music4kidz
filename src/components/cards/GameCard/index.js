import React, { Component } from 'react';
import PropTypes from 'prop-types';

import CardTitle from '_components/cards/CardTitle';
import ButtonMiniplayer from '_components/ButtonMiniplayer';

import style from './style.styl';

export default class GameCard extends Component {
  render() {
    const {
      container, title: titleStyles,
      image, button,
    } = style;

    const {
      data: { name, image_url: imageUrl },
      callbacks: { onCardClick, onButtonClick },
    } = this.props;

    const backgroundStyles = {};

    if (imageUrl) {
      backgroundStyles.backgroundImage = `url(${imageUrl})`;
    }

    return (
      <div className={container} onClick={onCardClick}>
        <CardTitle text={name} styles={titleStyles} />
        <ButtonMiniplayer onClick={onButtonClick} position={button} />
        <div className={image} style={backgroundStyles}>image</div>
      </div>
    );
  }
}

GameCard.propTypes = {
  data: PropTypes.object,
  callbacks: PropTypes.object,
};
