import React, { Component } from 'react';
import PropTypes from 'prop-types';
import CARDS from '_data/cardsType';
import { connect } from 'react-redux';

import PersonalCard from '_components/cards/PersonalCard';
import SingleCard from '_components/cards/SingleCard';
import RadioCard from '_components/cards/RadioCard';
import CollectionCard from '_components/cards/CollectionCard';
import CartoonCard from '_components/cards/CartoonCard';
import GameCard from '_components/cards/GameCard';

class Card extends Component {
  _onClick = (callback) => {
    const {
      data, radio, isPlaying,
      position, trackId,
    } = this.props;
    const playlistId = data.id;
    const tracks = (playlistId === 'radio') ? radio : data.tracks;

    if (
      typeof callback === 'function'
      && Array.isArray(tracks) && tracks.length > 0
    ) {
      const params = {
        trackId: tracks[0].id,
        prevTrackId: trackId,
        playlist: tracks,
        isRadio: playlistId === 'radio',
        playlistId,
        isPlaying,
        position,
        cardType: data.type,
        cardTitle: data.name,
      };
      callback(params);
    }
  };

  _handleCardClick = () => {
    this._onClick(this.props.callbacks.onCardClick);
  };

  _handleButtonClick = (e) => {
    e.stopPropagation();
    this._onClick(this.props.callbacks.onButtonClick);
  };

  _isPlaylistLiked = (playlistId) => {
    const { userPlaylists } = this.props;
    if (userPlaylists) {
      return userPlaylists.some((playlist) => playlist.id === playlistId);
    }
    return false;
  };

  renderCard = () => {
    const cards = {
      [CARDS.radio]: RadioCard,
      [CARDS.soundtrack]: CartoonCard,
      [CARDS.single]: SingleCard,
      [CARDS.collection]: CollectionCard,
      [CARDS.game]: GameCard,
      [CARDS.personal]: PersonalCard,
    };

    const {
      backgroundsList, data, isPlaying,
      userId,
    } = this.props;
    const CardsType = cards[data.type];
    const callbacks = {
      handleCardClick: this._handleCardClick,
      handleButtonClick: this._handleButtonClick,
      onAddClick: this.props.callbacks.onAddClick,
    };

    return (
      <CardsType
        data={data}
        callbacks={callbacks}
        bgs={backgroundsList}
        isPlaying={isPlaying}
        isLiked={this._isPlaylistLiked(data.id)}
        isAuth={Boolean(userId)}
      />
    );
  };

  render() {
    return (
      <div>
        { this.renderCard() }
      </div>
    );
  }
}

export default connect((state, props) => {
  const {
    dictionaries: { backgroundsList }, user,
    player: {
      playlistId, shouldPlay, radio,
      position, trackId,
    },
  } = state;
  return {
    ...props,
    backgroundsList,
    playlistId,
    shouldPlay,
    radio,
    position,
    trackId,
    userPlaylists: user.playlists,
    userId: user.data.id,
  };
})(Card);

Card.propTypes = {
  callbacks: PropTypes.object,
  data: PropTypes.object,
  backgroundsList: PropTypes.object,
  radio: PropTypes.array,
  position: PropTypes.number,
  trackId: PropTypes.number,
  isPlaying: PropTypes.bool,
  userPlaylists: PropTypes.array,
  userId: PropTypes.number,
};
