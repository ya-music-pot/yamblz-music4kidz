import React, { Component } from 'react';
import PropTypes from 'prop-types';

import CardTitle from '_components/cards/CardTitle';
import ButtonMiniplayer from '_components/ButtonMiniplayer';

import style from './style.styl';

export default class GameCard extends Component {
  _handleCardClick = () => {
    const {
      data: { tracks, id: playlistId },
      callbacks: { onCardClick },
    } = this.props;

    if (
      typeof onCardClick === 'function'
      && Array.isArray(tracks) && tracks.length > 0
    ) {
      onCardClick(tracks[0].id, tracks, false, playlistId, this.props.isPlaying);
    }
  };

  _handleButtonClick = (e) => {
    e.stopPropagation();
    const {
      data: { tracks, id: playlistId },
      callbacks: { onButtonClick },
    } = this.props;

    if (
      typeof onButtonClick === 'function'
      && Array.isArray(tracks) && tracks.length > 0
    ) {
      onButtonClick(tracks[0].id, tracks, false, playlistId, this.props.isPlaying);
    }
  };

  render() {
    const {
      container, title: titleStyles,
      image, button, buttonWrapper,
    } = style;

    const {
      data: { name, image_url: imageUrl }, isPlaying,
    } = this.props;

    const backgroundStyles = {};

    if (imageUrl) {
      backgroundStyles.backgroundImage = `url(${imageUrl})`;
    }

    return (
      <div className={container} onClick={this._handleCardClick}>
        <CardTitle text={name} styles={titleStyles} />
        <div className={buttonWrapper}>
          <ButtonMiniplayer
            onClick={this._handleButtonClick}
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
