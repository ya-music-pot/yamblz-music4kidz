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
    if (this.context.yaPlayer!==nextContext.yaPlayer && nextContext.yaPlayer) {
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
      });

      this.setState({ playerState });
    });

    this.yaPlayer.setTimeUpdateCallback(() => {
      const currentTrackPosition = this.yaPlayer.getCurrentTrackPosition();
      const currentTrackDuration = this.yaPlayer.getCurrentTrackDuration();

      if (currentTrackDuration) {
        const trackPercentage = currentTrackPosition / currentTrackDuration * 100;
        const playerState = Object.assign({}, this.state.playerState, { trackPercentage });

        this.setState({ playerState });
      }
    });
  };

  _handleTogglePlay = (cardId, e) => {

    e.stopPropagation();

    let playState;

    if (!this.yaPlayer.isPlaying() || cardId !== this.state.activeCardId) {
      // TODO плейлисты в карточки будут приходить из store
      const cardPlayList = playlists[cardId];

      if (cardId !== this.state.activeCardId) {
        this.yaPlayer.stop();
      }
      this.yaPlayer.setPlaylist(cardPlayList);
      this.yaPlayer.play();
      playState = true;
    } else {
      this.yaPlayer.pause();
      playState = false;
    }

    setTimeout(() => {
      const playerState = this.state.playerState;

      this.setState({
        activeCardId: cardId,
        playerState: Object.assign({}, playerState, {
          isPlaying: playState,
        }),
      });
    }, 0);
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
        {
          activeCardId &&
          <MiniPlayer
            trackName={trackName}
            singerName={singerName}
            trackPercentage={trackPercentage}
            isPlaying={isPlaying}
            onTogglePlay={this._handleTogglePlay.bind(this, this.state.activeCardId)}
            onDownload={this._handleDownload}
            className={style['playlist-miniPlayer']}
          />
        }
      </div>
    );
  }
}

export default connect((state, props) => ({
  settings: state.settings,
  ...props,
}))(Playlist);

Playlist.contextTypes = {
  yaPlayer: PropTypes.object,
  settings: PropTypes.object,
};

Playlist.propTypes = {
  settings: PropTypes.object,
  router: PropTypes.object,
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
      '3935391',
    ],
  },
  game: {
    title: 'game',
    tracks: [
      '7671',
    ],
  },
  newTrack: {
    title: 'newTrack',
    tracks: [
      '3935390',
    ],
  },
  radio: {
    title: 'radio',
    tracks: [
      '3935287',
    ],
  },
  collection: {
    title: 'collection',
    tracks: [
      '3935388',
    ],
  },
};
