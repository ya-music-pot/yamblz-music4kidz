import React, { Component } from 'react';
import PropTypes from 'prop-types';

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

  render() {
    const {
      container, title,
      subtitle, image, button,
    } = style;

    const {
      data: { name, image_url: imageUrl },
      callbacks: { onButtonClick },
    } = this.props;

    const backgroundStyles = {};

    if (imageUrl) {
      backgroundStyles.backgroundImage = `url(${imageUrl})`;
    }

    return (
      <div className={container} onClick={this._handleCardClick}>
        <CardTitle text={name} styles={title} />
        <CardSubtitle text="Радио исполнителя" styles={subtitle} />
        <div className={image} style={backgroundStyles}>photo</div>
        <ButtonMiniplayer onClick={onButtonClick} position={button} />
      </div>
    );
  }
}

RadioCard.propTypes = {
  data: PropTypes.object,
  callbacks: PropTypes.object,
};
