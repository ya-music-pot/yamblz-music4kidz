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
import MiniPlayer from '_components/MiniPlayer';

import style from './style.scss';

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

  componentWillMount() {
    this.yaPlayer = this.context.yaPlayer;
    if (this.yaPlayer) {
      this._initPlayer();
    }
  }

  componentWillReceiveProps(nextProps, nextContext) {
    if (this.context.yaPlayer !== nextContext.yaPlayer && nextContext.yaPlayer) {
      this.yaPlayer = nextContext.yaPlayer;
      this._initPlayer();
    }
  }

  _initPlayer = () => {
    const playerError = this.yaPlayer.getPlayerError();
    if (playerError) {
      // TODO вызвать модальное окно с ошибкой
      alert(playerError);
      return;
    }

    this.yaPlayer.setTrackDataCallback(() => {
      const playerState = Object.assign({}, this.state.playerState, {
        trackName: this.yaPlayer.getCurrentTrackTitle(),
        singerName: this.yaPlayer.getCurrentTrackArtists()[0]["name"],
        trackPercentage: this.yaPlayer.getCurrentTrackPosition(),
      });

      this.setState({ playerState });
    });

    this.yaPlayer.setTimeUpdateCallback(() => {
      const playerState = Object.assign({}, this.state.playerState, {
        trackPercentage: this.yaPlayer.getCurrentTrackPosition(),
      });

      this.setState({ playerState });
    });
  };

  _handleTogglePlay = (cardId) => {
    if (!this.yaPlayer.isPlaying()) {
      // TODO плейлисты в карточки будут приходить из store
      const cardPlayList = playlists[cardId];

      this.yaPlayer.setPlaylist(cardPlayList);
      this.yaPlayer.play();
    } else {
      this.yaPlayer.pause();
    }

    setTimeout(() => {
      const playerState = this.state.playerState;

      this.setState({
        activeCardId: cardId,
        playerState: Object.assign({}, playerState, {
          isPlaying: !playerState.isPlaying,
        }),
      });
    }, 0);
  };

  _handleDownload = () => {
    // TODO обработать нажатие кнопки скачать
  };

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
    const { activeCardId } = this.state;
    const { trackName, singerName, trackPercentage, isPlaying } = this.state.playerState;

    return (
      <div className={playlist}>
        <div className={container}>
          <Topbar />
          <PersonalCard
            id="personal"
            settings={settings}
            onButtonClick={this._handleTogglePlay.bind(this, 'personal')}
          />
          <CartoonCard
            id="cartoon"
            data={willRecieved.personal}
            onButtonClick={this._handleTogglePlay.bind(this, 'cartoon')}
          />
          <GameCard
            id="game"
            data={willRecieved.game}
            onButtonClick={this._handleTogglePlay.bind(this, 'game')}
          />
          <SingleCard
            id="newTrack"
            data={willRecieved.newTrack}
            onButtonClick={this._handleTogglePlay.bind(this, 'newTrack')}
          />
          <RadioCard
            id="radio"
            data={willRecieved.radio}
            onButtonClick={this._handleTogglePlay.bind(this, 'radio')}
          />
          <CollectionCard
            id="collection"
            data={willRecieved.collection}
            onButtonClick={this._handleTogglePlay.bind(this, 'collection')}
          />
        </div>
        {
          activeCardId &&
          <MiniPlayer
            trackName={trackName}
            singerName={singerName}
            trackPercentage={trackPercentage}
            isPlaying={isPlaying}
            onTogglePlay={this._handleTogglePlay}
            onDownload={this._handleDownload}
            className={style['playlist-miniPlayer']}
          />
        }
      </div>
    );
  }
}

export default connect((state, props) => ({
  ...state,
  ...props,
}))(Playlist);

Playlist.contextTypes = {
  yaPlayer: PropTypes.object,
};

// TODO данные должны приходить из store
const playlists = {
  personal: {
    title: 'personal',
    tracks: [
      '57730',
    ],
  },
  cartoon: {
    title: 'cartoon',
    tracks: [
      '57730',
    ],
  },
  game: {
    title: 'game',
    tracks: [
      '57730',
    ],
  },
  newTrack: {
    title: 'newTrack',
    tracks: [
      '57730',
    ],
  },
  radio: {
    title: 'radio',
    tracks: [
      '57730',
    ],
  },
  collection: {
    title: 'collection',
    tracks: [
      '57730',
    ],
  },
};