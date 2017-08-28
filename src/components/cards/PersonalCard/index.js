import React, { Component } from 'react';

import EmojiStatus from '_components/EmojiStatus';
import CardTitle from '_components/cards/CardTitle';
import CardSubtitle from '_components/cards/CardSubtitle';
import CardButton from '_components/cards/CardButton';

import style from './style.scss';

export default class PersonalCard extends Component {
  _openPlayer = () => {
    console.log('open player');
  }

  render() {
    const { container } = style;

    return (
      <div className={container}>
        <EmojiStatus />
        <CardTitle text="Весёлая поездка" />
        <CardSubtitle text="Мой плейлист" />
        <CardButton onClick={this._openPlayer} label="play" />
      </div>
    );
  }
}

PersonalCard.propTypes = {};
