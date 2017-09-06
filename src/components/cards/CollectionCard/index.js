import React, { Component } from 'react';
import PropTypes from 'prop-types';

import CardTitle from '_components/cards/CardTitle';
import ButtonMiniplayer from '_components/ButtonMiniplayer';

import style from './style.styl';

export default class CollectionCard extends Component {
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

  _handleButtonClick = (e) => {
    e.stopPropagation();
    const {
      data: { tracks },
      callbacks: { onButtonClick },
    } = this.props;

    if (
      typeof onButtonClick === 'function'
      && Array.isArray(tracks) && tracks.length > 0
    ) {
      onButtonClick(tracks[0].id, tracks);
    }
  };

  render() {
    const {
      container, title,
      content, button, image,
    } = style;

    const {
      data: { name, image_url: imageUrl },
    } = this.props;

    const backgroundStyles = {};

    if (imageUrl) {
      backgroundStyles.backgroundImage = `url(${imageUrl})`;
    }

    return (
      <div className={container} onClick={this._handleCardClick}>
        <div className={content}>
          <CardTitle text={name} styles={title} />
          <ButtonMiniplayer onClick={this._handleButtonClick} position={button} />
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
