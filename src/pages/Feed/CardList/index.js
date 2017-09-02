import React, {Component} from 'react';
import PropTypes from 'prop-types';
import {connect} from 'react-redux';
import cl from 'classname';

import CARDS from '_data/cardsType';

import SingleCard from '_components/cards/SingleCard';
import RadioCard from '_components/cards/RadioCard';
import CollectionCard from '_components/cards/CollectionCard';
import CartoonCard from '_components/cards/CartoonCard/index';
import GameCard from '_components/cards/GameCard/index';

import style from './style.scss';

class CardList extends Component {

  renderList = (arr) => {
    return arr.map((data) => this.renderCard(data));
  };

  renderCard = (data) => {
    const cards = {
      [CARDS.radio]: RadioCard,
      [CARDS.soundtrack]: CartoonCard,
      [CARDS.single]: SingleCard,
      [CARDS.collection]: CollectionCard,
      [CARDS.game]: GameCard,
    };

    const CardsType = cards[data.type];

    const { onButtonClick, onCardClick } = this.props.callbacks;

    return (
      <CardsType data={data} onButtonClick={onButtonClick} onCardClick={onCardClick}/>
    );
  };

  render() {

    return (
      <div>
        { this.renderList(playlistDataMock) }
      </div>
    );
  }
}

export default connect((state, props) => ({
  ...props,
}))(CardList);

CardList.propTypes = {
  callbacks: PropTypes.object,
};

const playlistDataMock = [{
  id: 65536,
  type: 2,
  name: 'Frank Sinatra',
  description: 'Blue Moon',
  image_url: 'http://i.imgur.com/u5CJQoh.jpg',
  tracks: [{
    id: 4451438,
    name: 'Blue Moon',
    artist: 'Frank Sinatra',
    lyrics: 'null',
    image_url: 'http://i.imgur.com/u5CJQoh.jpg',
    mp3_url: 'https://dl.dropboxusercontent.com/s/2om6xhxtexlrx3m/frank_sinatra_blue_moon.mp3'
  }]
}, {
  id: 98304,
  type: 1,
  name: 'Baby Driver',
  description: 'Саундтрек к фильму',
  image_url: 'http://i.imgur.com/ZFXcxBc.jpg',
  tracks: [{
    id: 645550,
    name: 'Baby Driver',
    artist: 'Simon & Garfunkel',
    lyrics: 'null',
    image_url: 'http://i.imgur.com/N9ISCEP.jpg',
    mp3_url: 'https://dl.dropboxusercontent.com/s/5a457q69533fe7p/simon_garfunkel_baby_driver.mp3?dl=0'
  }, {
    id: 432072,
    name: 'Transmission',
    artist: 'Joy Division',
    lyrics: 'null',
    image_url: 'http://i.imgur.com/fbX0QVS.png',
    mp3_url: 'https://dl.dropboxusercontent.com/s/tve7nkp2qm0hy39/joy_division_transmission.mp3'
  }, {
    id: 6996539,
    name: 'Minor Swing',
    artist: 'Django Reinhardt',
    lyrics: 'null',
    image_url: 'http://i.imgur.com/EVx8c9J.jpg',
    mp3_url: 'https://dl.dropboxusercontent.com/s/sui1gzfs6exckue/django_reinhardt_minor_swing.mp3'
  }]
}, {
  id: 131072,
  type: 0,
  name: 'Django Reinhardt',
  description: 'null',
  image_url: 'http://i.imgur.com/EVx8c9J.jpg',
  tracks: [{
    id: 6996539,
    name: 'Minor Swing',
    artist: 'Django Reinhardt',
    lyrics: 'null',
    image_url: 'http://i.imgur.com/EVx8c9J.jpg',
    mp3_url: 'https://dl.dropboxusercontent.com/s/sui1gzfs6exckue/django_reinhardt_minor_swing.mp3'
  }]
}, {
  id: 131073,
  type: 1,
  name: 'Whiplash',
  description: 'Саундтрек в твоем темпе',
  image_url: 'http://i.imgur.com/KWtzrGs.jpg',
  tracks: [{
    id: 26423981,
    name: 'Whiplash',
    artist: 'Justin Hurwitz',
    lyrics: 'null',
    image_url: 'http://i.imgur.com/KWtzrGs.jpg',
    mp3_url: 'https://dl.dropboxusercontent.com/s/lv4admaah0snuke/justin_hurwitz_whiplash.mp3'
  }]
}, {
  id: 131074,
  type: 2,
  name: 'Joy Division',
  description: 'Transmission',
  image_url: 'http://i.imgur.com/fbX0QVS.png',
  tracks: [{
    id: 432072,
    name: 'Transmission',
    artist: 'Joy Division',
    lyrics: 'null',
    image_url: 'http://i.imgur.com/fbX0QVS.png',
    mp3_url: 'https://dl.dropboxusercontent.com/s/tve7nkp2qm0hy39/joy_division_transmission.mp3'
  }]
}, {
  id: 131075,
  type: 0,
  name: 'The White Stripes',
  description: 'null',
  image_url: 'http://i.imgur.com/IXBmYUM.jpg',
  tracks: [{
    id: 6689093,
    name: 'Fell In Love With A Girl',
    artist: 'The White Stripes',
    lyrics: 'null',
    image_url: 'http://i.imgur.com/wKPfyuc.jpg',
    mp3_url: 'https://dl.dropboxusercontent.com/s/dskn5t33n9m2cuw/the_white_stripes_fell_in_love_with_a_girl.mp3'
  }]
}];
