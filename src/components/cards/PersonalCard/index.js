import React, { Component } from 'react';

import EmojiStatus from '_components/EmojiStatus';
import CardTitle from '_components/cards/CardTitle';
import CardSubtitle from '_components/cards/CardSubtitle';
import Button from '_components/Button';

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
        <CardTitle text="fanny trip" />
        <CardSubtitle text="my playlist" />
        <Button onClick={this._openPlayer} label="play" />
      </div>
    );
  }
}

PersonalCard.propTypes = {};
