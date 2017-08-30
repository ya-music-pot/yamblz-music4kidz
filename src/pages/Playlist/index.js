import React, { Component } from 'react';
import { connect } from 'react-redux';

import Topbar from '_components/Topbar';

import PersonalCard from '_components/cards/PersonalCard';
import SingleCard from '_components/cards/SingleCard';
import RadioCard from '_components/cards/RadioCard';
import CollectionCard from '_components/cards/CollectionCard';
import CartoonCard from '_components/cards/CartoonCard/index';
import GameCard from '_components/cards/GameCard/index';

import style from './style.scss';

class Playlist extends Component {
  render() {
    const { playlist, container } = style;

    const willBeFromState = {
      settings: {
        activeEmoji: 'emoji-sunglasses',
        activeAction: 'action-car',
      },
    };

    const willRecieved = {
      personal: {
        title: 'Тачки 3',
        text: '16 песен из мультика',
        imageUrl: '',
      },
      game: {
        title: 'Слушай и играй',
        imageUrl: '',
      },
      newTrack: {
        author: 'Imagine Gragons',
        song: 'Thunder',
        imageUrl: '',
      },
      radio: {
        title: 'MiyaGi',
        imageUrl: '',
      },
      collection: {
        title: 'Песни Ивангая',
        imageUrl: '',
      },
    };

    const { settings } = willBeFromState;

    return (
      <div className={playlist}>
        <div className={container}>
          <Topbar />
          <PersonalCard settings={settings} />
          <CartoonCard data={willRecieved.personal} />
          <GameCard data={willRecieved.game} />
          <SingleCard data={willRecieved.newTrack} />
          <RadioCard data={willRecieved.radio} />
          <CollectionCard data={willRecieved.collection} />
        </div>
      </div>
    );
  }
}

export default connect((state, props) => ({
  ...state,
  ...props,
}))(Playlist);
