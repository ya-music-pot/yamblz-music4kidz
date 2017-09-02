import React, { Component } from 'react';
import PropTypes from 'prop-types';

import CardTitle from '_components/cards/CardTitle';
import ButtonMiniplayer from '_components/ButtonMiniplayer';

import style from './style.scss';

export default class GameCard extends Component {
  render() {
    const {
      container, title: titleStyles,
      image, button,
    } = style;

    const {
      data: { title, imageUrl },
      callbacks: { onCardClick, onButtonClick },
    } = this.props;

    const backgroundStyles = {};

    if (imageUrl) {
      backgroundStyles.backgroundImage = `url(${imageUrl})`;
    }

    return (
      <div className={container} onClick={onCardClick}>
        <CardTitle text={title} styles={titleStyles} />
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
