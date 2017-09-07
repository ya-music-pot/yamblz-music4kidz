import React, { Component } from 'react';
import PropTypes from 'prop-types';
import cl from 'classname';

import getRandomInteger from '_helpers/randomNumber';
import CardTitle from '_components/cards/CardTitle';
import CardSubtitle from '_components/cards/CardSubtitle';
import ButtonMiniplayer from '_components/ButtonMiniplayer';

import style from './style.styl';

export default class RadioCard extends Component {
  constructor() {
    super();
    this._bg = null;
  }

  componentWillMount() {
    if (this._bg === null) {
      const { colors } = this.props.bgs;
      const color = colors[getRandomInteger(0, colors.length - 1)];
      this._bg = { backgroundColor: `#${color}` };
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
      onCardClick(tracks[0].id, tracks, true);
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
      container, title, circle,
      subtitle, image, button,
      circleL, circleM, circleS,
      imageContainer,
    } = style;

    const {
      data: { name, image_url: imageUrl },
    } = this.props;

    const imageStyles = {};
    if (imageUrl) {
      imageStyles.backgroundImage = `url(${imageUrl})`;
    }

    return (
      <div style={this._bg} className={container} onClick={this._handleCardClick}>
        <CardTitle text={name} styles={title} />
        <CardSubtitle text="Радио исполнителя" styles={subtitle} />
        <div className={imageContainer}>
          <div className={cl(circle, circleL)} />
          <div className={cl(circle, circleM)} />
          <div className={cl(circle, circleS)} />
          <div className={image} style={imageStyles} />
        </div>
        <ButtonMiniplayer onClick={this._handleButtonClick} position={button} />
      </div>
    );
  }
}

RadioCard.propTypes = {
  data: PropTypes.object,
  callbacks: PropTypes.object,
  bgs: PropTypes.object,
};
