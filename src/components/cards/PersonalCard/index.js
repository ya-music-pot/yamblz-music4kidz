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
      settings,
      callbacks: { onCardClick, onButtonClick },
    } = this.props;

    return (
      <div className={container} onClick={onCardClick}>
        <EmojiStatus settings={settings} />
        <CardTitle text="Весёлая поездка" styles={title} />
        <CardSubtitle text="Мой плейлист" styles={subtitle} />
        <ButtonMiniplayer onClick={onButtonClick} position={button} />
      </div>
    );
  }
}

PersonalCard.propTypes = {
  settings: PropTypes.object,
  callbacks: PropTypes.object,
};
