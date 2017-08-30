import React, { Component } from 'react';
import PropTypes from 'prop-types';

import EmojiStatus from '_components/EmojiStatus';
import CardTitle from '_components/cards/CardTitle';
import CardSubtitle from '_components/cards/CardSubtitle';
import ButtonMiniplayer from '_components/ButtonMiniplayer';

import style from './style.scss';

export default class PersonalCard extends Component {
  _openMiniplayer = () => {
    console.log('open miniplayer');
  };

  render() {
    const { container, title, subtitle, button } = style;

    return (
      <div className={container}>
        <EmojiStatus settings={this.props.settings} />
        <CardTitle text="Весёлая поездка" styles={title} />
        <CardSubtitle text="Мой плейлист" styles={subtitle} />
        <ButtonMiniplayer onClick={this._openMiniplayer} position={button} />
      </div>
    );
  }
}

PersonalCard.propTypes = {
  settings: PropTypes.object,
};
