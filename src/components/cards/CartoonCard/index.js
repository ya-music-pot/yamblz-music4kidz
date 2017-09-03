import React, { Component } from 'react';
import PropTypes from 'prop-types';

import CardTitle from '_components/cards/CardTitle';
import CardSubtitle from '_components/cards/CardSubtitle';
import ButtonMiniplayer from '_components/ButtonMiniplayer';

import style from './style.styl';

export default class CartoonCard extends Component {
  _handleCardClick = () => {
    const {
      data: { tracks, id },
      callbacks: { onCardClick },
    } = this.props;

    if (
      typeof onCardClick === 'function'
      && Array.isArray(tracks) && tracks.length > 0
    ) {
      onCardClick(tracks[0].id, id);
    }
  };

  render() {
    const {
      container, content, title: titleStyles,
      subtitle, button,
    } = style;

    const {
      data: { title, text, imageUrl },
    } = this.props;

    const backgroundStyles = {};

    if (imageUrl) {
      backgroundStyles.backgroundImage = `url(${imageUrl})`;
    }

    return (
      <div className={container} onClick={this._handleCardClick} style={backgroundStyles}>
        <div className={content}>
          <CardTitle text={title} styles={titleStyles} />
          <CardSubtitle text={text} styles={subtitle} />
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
