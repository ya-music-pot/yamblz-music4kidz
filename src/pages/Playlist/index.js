import React, { Component } from 'react';
import { connect } from 'react-redux';

import Topbar from '_components/Topbar';

import PersonalCard from '_components/cards/PersonalCard';
import SingleCard from '_components/cards/SingleCard';
import RadioCard from '_components/cards/RadioCard';
import CollectionCard from '_components/cards/CollectionCard';
import CartoonCard from 'components/cards/CartoonCard/index';
import GameCard from '_components/cards/GameCard/index';

import style from './style.scss';

class Playlist extends Component {
  render() {
    return (
      <div className={style.playlist}>
        <Topbar />
        <PersonalCard />
        <CartoonCard />
        <GameCard />
        <SingleCard />
        <RadioCard />
        <CollectionCard />
      </div>
    );
  }
}

export default connect((state, props) => ({
  ...state,
  ...props,
}))(Playlist);
