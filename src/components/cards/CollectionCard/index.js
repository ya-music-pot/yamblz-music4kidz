import React, { Component } from 'react';
import PropTypes from 'prop-types';

import CardTitle from '_components/cards/CardTitle';
import ButtonMiniplayer from '_components/ButtonMiniplayer';

import style from './style.styl';

export default class CollectionCard extends Component {
  render() {
    const {
      container, title: titleStyles,
      content, button,
    } = style;

    const {
      data: { title, imageUrl },
      callbacks: { onCardClick, onButtonClick },
    } = this.props;


    const backgroundStyles = {};

    if (imageUrl) {
      backgroundStyles.backgroundImage = `url(${imageUrl})`;
    }

    return (
      <div className={container} style={backgroundStyles} onClick={onCardClick}>
        <div className={content}>
          <CardTitle text={title} styles={titleStyles} />
          <ButtonMiniplayer onClick={onButtonClick} position={button} />
        </div>
      </div>
    );
  }
}

CollectionCard.propTypes = {
  data: PropTypes.object,
  callbacks: PropTypes.object,
};
