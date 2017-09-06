import React, { Component } from 'react';
import PropTypes from 'prop-types';

import CardTitle from '_components/cards/CardTitle';
import ButtonMiniplayer from '_components/ButtonMiniplayer';

import style from './style.styl';

export default class CollectionCard extends Component {
  render() {
    const {
      container, title,
      content, button, image,
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
        <div className={content}>
          <CardTitle text={name} styles={title} />
          <ButtonMiniplayer onClick={onButtonClick} position={button} />
        </div>
        <div className={image} style={backgroundStyles}>image</div>
      </div>
    );
  }
}

CollectionCard.propTypes = {
  data: PropTypes.object,
  callbacks: PropTypes.object,
};
