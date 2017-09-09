import React, { Component } from 'react';
import PropTypes from 'prop-types';

import CardTitle from '_components/cards/CardTitle';
import CardSubtitle from '_components/cards/CardSubtitle';
import ButtonMiniplayer from '_components/ButtonMiniplayer';

import style from './style.styl';

export default class CartoonCard extends Component {
  render() {
    const {
      container, content, title,
      subtitle, button,
    } = style;

    const {
      data: { name, description, image_url: imageUrl },
      callbacks: { handleCardClick, handleButtonClick },
      isPlaying,
    } = this.props;

    const backgroundStyles = {};

    if (imageUrl) {
      backgroundStyles.backgroundImage = `url(${imageUrl})`;
    }

    return (
      <div className={container} onClick={handleCardClick} style={backgroundStyles}>
        <div className={content}>
          <CardTitle text={name} styles={title} />
          <CardSubtitle text={description} styles={subtitle} />
          <ButtonMiniplayer
            onClick={handleButtonClick}
            position={button}
            isPlaying={isPlaying}
          />
        </div>
      </div>
    );
  }
}

CartoonCard.propTypes = {
  data: PropTypes.object,
  callbacks: PropTypes.object,
  isPlaying: PropTypes.bool,
};
