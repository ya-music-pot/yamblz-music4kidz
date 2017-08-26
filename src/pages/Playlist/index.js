import React, { Component } from 'react';
import { connect } from 'react-redux';

import PersonalCard from '_components/cards/PersonalCard';
import SingleCard from '_components/cards/SingleCard';
import RadioCard from '_components/cards/RadioCard';
import CollectionCard from '_components/cards/CollectionCard';

class Playlist extends Component {
  render() {
    return (
      <div>
        <PersonalCard />
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
