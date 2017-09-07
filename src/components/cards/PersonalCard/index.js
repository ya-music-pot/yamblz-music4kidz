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
      tracks,
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
      tracks,
      callbacks: { onButtonClick },
    } = this.props;

    if (
      typeof onButtonClick === 'function'
      && Array.isArray(tracks) && tracks.length > 0
    ) {
      onButtonClick(tracks[0].id, tracks, true);
    }
  };

  render() {
    const { container, title, subtitle, button } = style;
    const { settings } = this.props;

    return (
      <div className={container} onClick={this._handleCardClick}>
        <EmojiStatus settings={settings} />
        <CardTitle text={settings.title} styles={title} />
        <CardSubtitle text="Мой плейлист" styles={subtitle} />
        <ButtonMiniplayer onClick={this._handleButtonClick} position={button} />
      </div>
    );
  }
}

PersonalCard.propTypes = {
  tracks: PropTypes.arrayOf(PropTypes.object),
  settings: PropTypes.object,
  callbacks: PropTypes.object,
};
