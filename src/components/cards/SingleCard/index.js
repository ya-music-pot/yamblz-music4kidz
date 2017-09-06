import React, { Component } from 'react';
import PropTypes from 'prop-types';

import CardTitle from '_components/cards/CardTitle';
import ButtonMiniplayer from '_components/ButtonMiniplayer';

import style from './style.styl';

export default class SingleCard extends Component {
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
      info, singer, button,
    } = style;

    const {
      artist, name, image_url: imageUrl,
    } = this.props.data.tracks[0];

    const backgroundStyles = {};

    if (imageUrl) {
      backgroundStyles.backgroundImage = `url(${imageUrl})`;
    }

    return (
      <div className={container} style={backgroundStyles} onClick={this._handleCardClick}>
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
};
