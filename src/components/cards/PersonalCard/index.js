import React, { Component } from 'react';
import PropTypes from 'prop-types';

import EmojiStatus from '_components/EmojiStatus';
import CardTitle from '_components/cards/CardTitle';
import CardSubtitle from '_components/cards/CardSubtitle';
import ButtonMiniplayer from '_components/ButtonMiniplayer';

import style from './style.styl';

export default class PersonalCard extends Component {
  render() {
    const { container, title, subtitle, button } = style;
    const {
      data, isPlaying,
      callbacks: { handleCardClick, handleButtonClick },
    } = this.props;

    return (
      <div className={container} onClick={handleCardClick}>
        <EmojiStatus settings={data} />
        <CardTitle text={data.title} styles={title} />
        <CardSubtitle text="Моё радио" styles={subtitle} />
        <ButtonMiniplayer
          onClick={handleButtonClick}
          position={button}
          isPlaying={isPlaying}
        />
      </div>
    );
  }
}

PersonalCard.propTypes = {
  data: PropTypes.object,
  callbacks: PropTypes.object,
  isPlaying: PropTypes.bool,
};
