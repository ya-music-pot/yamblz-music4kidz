import React, { Component } from 'react';

import EmojiStatus from '_components/EmojiStatus';
import CardTitle from '_components/cards/CardTitle';
import CardSubtitle from '_components/cards/CardSubtitle';
import CardButton from '_components/cards/CardButton';

import style from './style.scss';

export default class PersonalCard extends Component {
  _openPlayer = () => {
    console.log('open miniplayer');
  };

  render() {
    const { container, subtitle } = style;

    const data = {
      status: {
        mood: 'Angry',
        activity: 'Катаюсь',
      },
    };

    return (
      <div className={container}>
        <EmojiStatus status={data.status} />
        <CardTitle text="Весёлая поездка" />
        <CardSubtitle text="Мой плейлист" styles={subtitle} />
        <CardButton onClick={this._openPlayer} label="play" />
      </div>
    );
  }
}

PersonalCard.propTypes = {};
