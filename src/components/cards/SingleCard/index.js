import React, { Component } from 'react';
import PropTypes from 'prop-types';

import getRandomInteger from '_helpers/randomNumber';
import CardTitle from '_components/cards/CardTitle';
import ButtonMiniplayer from '_components/ButtonMiniplayer';

import style from './style.styl';

export default class SingleCard extends Component {
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
      container, content, title,
      info, singer, button, overlay,
    } = style;

    const {
      artist, name, image_url: imageUrl,
    } = this.props.data.tracks[0];

    const imageStyles = {};
    if (imageUrl) {
      imageStyles.backgroundImage = `url(${imageUrl})`;
    }

    return (
      <div className={container} style={imageStyles} onClick={this._handleCardClick}>
        <div className={overlay} style={this._bg} />
        <div className={content}>
          <CardTitle text="Модный трек" styles={title} />
          <div className={info}>
            <ButtonMiniplayer onClick={this._handleButtonClick} position={button} type="single" />
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
