import React, { Component } from 'react';
import PropTypes from 'prop-types';

import EmojiStatus from '_components/EmojiStatus';
import CardTitle from '_components/cards/CardTitle';
import CardSubtitle from '_components/cards/CardSubtitle';
import ButtonMiniplayer from '_components/ButtonMiniplayer';

import style from './style.styl';

export default class PersonalCard extends Component {
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

  render() {
    const { container, title, subtitle, button } = style;
    const {
      settings,
      callbacks: { onButtonClick },
    } = this.props;

    return (
      <div className={container} onClick={this._handleCardClick}>
        <EmojiStatus settings={settings} />
        <CardTitle text={settings.title} styles={title} />
        <CardSubtitle text="Мой плейлист" styles={subtitle} />
        <ButtonMiniplayer onClick={onButtonClick} position={button} />
      </div>
    );
  }
}

PersonalCard.propTypes = {
  data: PropTypes.object,
  settings: PropTypes.object,
  callbacks: PropTypes.object,
};
