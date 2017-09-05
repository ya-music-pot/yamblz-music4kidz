import React, { Component } from 'react';
import PropTypes from 'prop-types';

import CardTitle from '_components/cards/CardTitle';
import Button from '_components/Button';
import Icon from '_components/Icon';

import style from './style.styl';

export default class SingleCard extends Component {
  render() {
    const {
      container, content, title,
      info, singer, button,
    } = style;

    const { onCardClick, onButtonClick } = this.props.callbacks;
    const {
      artist, name, image_url: imageUrl,
    } = this.props.data.tracks[0];

    const backgroundStyles = {};

    if (imageUrl) {
      backgroundStyles.backgroundImage = `url(${imageUrl})`;
    }

    return (
      <div className={container} style={backgroundStyles} onClick={onCardClick}>
        <div className={content}>
          <CardTitle text="Новый трек" styles={title} />
          <div className={info}>
            <Button onClick={onButtonClick} style={button}>
              <Icon typeIcon="play-card" />
            </Button>
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
