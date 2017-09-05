import React, { Component } from 'react';
import PropTypes from 'prop-types';

import CardTitle from '_components/cards/CardTitle';
import CardSubtitle from '_components/cards/CardSubtitle';
import ButtonMiniplayer from '_components/ButtonMiniplayer';

import style from './style.styl';

export default class CartoonCard extends Component {
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

  _handleButtonClick = () => {

  };

  render() {
    const {
      container, content, title: titleStyles,
      subtitle, button,
    } = style;

    const {
      data: { name, description, image_url: imageUrl },
    } = this.props;

    const backgroundStyles = {};

    if (imageUrl) {
      backgroundStyles.backgroundImage = `url(${imageUrl})`;
    }

    return (
      <div className={container} onClick={this._handleCardClick} style={backgroundStyles}>
        <div className={content}>
          <CardTitle text={name} styles={titleStyles} />
          <CardSubtitle text={description} styles={subtitle} />
          <ButtonMiniplayer onClick={this._handleButtonClick} position={button} />
        </div>
      </div>
    );
  }
}

CartoonCard.propTypes = {
  data: PropTypes.object,
  callbacks: PropTypes.object,
};
