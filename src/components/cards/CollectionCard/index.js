import React, { Component } from 'react';
import PropTypes from 'prop-types';

import getRandomInteger from '_helpers/randomNumber';
import CardTitle from '_components/cards/CardTitle';
import ButtonMiniplayer from '_components/ButtonMiniplayer';

import style from './style.styl';

export default class CollectionCard extends Component {
  constructor() {
    super();
    this._bg = null;
  }

  componentWillMount() {
    if (this._bg === null) {
      const { gradients } = this.props.bgs;
      const gradient = gradients[getRandomInteger(0, gradients.length - 1)];
      this._bg = { backgroundImage: `linear-gradient(${gradient})` };
    }
  }

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


    const imageStyles = {};
    if (imageUrl) {
      imageStyles.backgroundImage = `url(${imageUrl})`;
    }

    return (
      <div className={container} onClick={this._handleCardClick} style={this._bg}>
        <div className={content}>
          <CardTitle text={name} styles={title} />
          <ButtonMiniplayer onClick={this._handleButtonClick} position={button} />
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
};
