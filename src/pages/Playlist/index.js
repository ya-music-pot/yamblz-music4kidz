import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

import Topbar from '_components/Topbar';

import PersonalCard from '_components/cards/PersonalCard';
import SingleCard from '_components/cards/SingleCard';
import RadioCard from '_components/cards/RadioCard';
import CollectionCard from '_components/cards/CollectionCard';
import CartoonCard from '_components/cards/CartoonCard/index';
import GameCard from '_components/cards/GameCard/index';

import style from './style.styl';

class Playlist extends Component {
  state = {
    activeCardId: null,

    playerState: {
      trackName: '',
      singerName: '',
      trackPercentage: 0,
      isPlaying: false,
    },
  };

  _handleTogglePlay = (cardId, e) => {
    e.stopPropagation();
  };

  _handleDownload = () => {
    // TODO обработать нажатие кнопки скачать
  };

  _onCardClick = () => {
    this.props.router.push('/player');
  };

  render() {
    const { playlist, container } = style;

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

    const { settings } = this.props;

    return (
      <div className={playlist}>
        <div className={container}>
          <Topbar />
          <PersonalCard
            id="personal"
            settings={settings}
            onButtonClick={this._handleTogglePlay.bind(this, 'personal')}
            onCardClick={this._onCardClick}
          />
          <CartoonCard
            id="cartoon"
            data={willRecieved.personal}
            onButtonClick={this._handleTogglePlay.bind(this, 'cartoon')}
            onCardClick={this._onCardClick}
          />
          <GameCard
            id="game"
            data={willRecieved.game}
            onButtonClick={this._handleTogglePlay.bind(this, 'game')}
            onCardClick={this._onCardClick}
          />
          <SingleCard
            id="newTrack"
            data={willRecieved.newTrack}
            onButtonClick={this._handleTogglePlay.bind(this, 'newTrack')}
            onCardClick={this._onCardClick}
          />
          <RadioCard
            id="radio"
            data={willRecieved.radio}
            onButtonClick={this._handleTogglePlay.bind(this, 'radio')}
            onCardClick={this._onCardClick}
          />
          <CollectionCard
            id="collection"
            data={willRecieved.collection}
            onButtonClick={this._handleTogglePlay.bind(this, 'collection')}
            onCardClick={this._onCardClick}
          />
        </div>
      </div>
    );
  }
}

export default connect((state, props) => ({
  settings: state.settings,
  ...props,
}))(Playlist);

Playlist.contextTypes = {
  settings: PropTypes.object,
};

Playlist.propTypes = {
  settings: PropTypes.object,
  router: PropTypes.object,
};

