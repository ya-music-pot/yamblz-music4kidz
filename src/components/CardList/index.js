import React, { Component } from 'react';
import PropTypes from 'prop-types';

import CARDS from '_data/cardsType';

import SingleCard from '_components/cards/SingleCard';
import RadioCard from '_components/cards/RadioCard';
import CollectionCard from '_components/cards/CollectionCard';
import CartoonCard from '_components/cards/CartoonCard/index';
import GameCard from '_components/cards/GameCard/index';

export default class CardList extends Component {
  renderCard = (data) => {
    const cards = {
      [CARDS.radio]: RadioCard,
      [CARDS.soundtrack]: CartoonCard,
      [CARDS.single]: SingleCard,
      [CARDS.collection]: CollectionCard,
      [CARDS.game]: GameCard,
    };

    const CardsType = cards[data.type];

    const { callbacks, backgroundsList } = this.props;

    return (
      <CardsType
        key={data.id}
        data={data}
        callbacks={callbacks}
        bgs={backgroundsList}
      />
    );
  };

  render() {
    const { data } = this.props.feed;

    return (
      <div>
        { data && data.map((card) => this.renderCard(card)) }
      </div>
    );
  }
}

CardList.propTypes = {
  callbacks: PropTypes.object,
  feed: PropTypes.object,
  backgroundsList: PropTypes.object,
};
