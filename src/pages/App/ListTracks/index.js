import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

import { playerModeUpdate } from '_actions/playerInfo';
import TrackInfo from '_components/TrackInfo';
import { playerPlay, playerPause } from '_actions/player';

import style from './style.styl';

class ListTracks extends Component {
  _onTogglePlay = (id) => {
    const { isPlaying, trackId } = this.props.player;
    const { mode } = this.props.playerInfo;

    if (!mode) this.props.playerModeUpdate('mini');

    if (id === trackId && isPlaying) {
      this.props.playerPause();
    } else {
      this.props.playerPlay(id);
    }
  }

  renderTrack(data, trackId, isPlaying) {
    const {
      id, name, artist,
      image_url,
    } = data;

    return (
      <TrackInfo
        key={id}
        currentTrack={id === trackId}
        className={style.item}
        isPlaying={id === trackId && isPlaying}
        trackId={id}
        name={name}
        artist={artist}
        imageUrl={image_url}
        onClick={this._onTogglePlay}
      />
    );
  }

  render() {
    const {
      info, player, playerInfo,
      listTracks,
    } = this.props;
    const { playlist, trackId, isPlaying } = player;
    const inPlayer = listTracks.inPlayer;

    return playlist && playlist.length && (
      <div>
        { info.title && <h3 className={style.title}>{info.title}</h3> }
        <div className={playerInfo.mode && !inPlayer && style.listShift}>
          { playlist.map((item) => this.renderTrack(item, trackId, isPlaying))}
        </div>
      </div>
    );
  }
}

export default connect((state, props) => ({
  ...props,
  // player: state.player,
  // playerInfo: state.playerInfo,
  playerInfo: {
    cardType: 3,
    cardTitle: 'Холодное сердце',
    cardCover: 'https://dl.dropboxusercontent.com/s/eqgn54qhwcnan4i/frozen.png?dl=0',
  },
  player: {
    cover: null,
    singerName: 'Холодное сердце',
    trackName: 'Холодное сердце',
    position: 0,
    trackId: null,
    playlist: [
      {
        id: 17197586,
        name: 'Сердце льда',
        artist: 'Павел Ковалёв',
        lyrics: null,
        image_url: null,
        mp3_url: 'https://static.yamblz.ru/music/heart_ice.mp3',
        added: false,
        genre_id: 0,
      }, {
        id: 31007179,
        name: 'За окном опять сугробы',
        artist: 'Natalia Bystrova',
        lyrics: null,
        image_url: null,
        mp3_url: 'https://static.yamblz.ru/music/sugrob.mp3',
        added: false,
        genre_id: 2,
      },
      {
        id: 234123,
        name: 'Сердце льда',
        artist: 'Павел Ковалёв',
        lyrics: null,
        image_url: null,
        mp3_url: 'https://static.yamblz.ru/music/heart_ice.mp3',
        added: false,
        genre_id: 0,
      }, {
        id: 1234,
        name: 'За окном опять сугробы',
        artist: 'Natalia Bystrova',
        lyrics: null,
        image_url: null,
        mp3_url: 'https://static.yamblz.ru/music/sugrob.mp3',
        added: false,
        genre_id: 2,
      },
      {
        id: 36563,
        name: 'Сердце льда',
        artist: 'Павел Ковалёв',
        lyrics: null,
        image_url: null,
        mp3_url: 'https://static.yamblz.ru/music/heart_ice.mp3',
        added: false,
        genre_id: 0,
      }, {
        id: 6784,
        name: 'За окном опять сугробы',
        artist: 'Natalia Bystrova',
        lyrics: null,
        image_url: null,
        mp3_url: 'https://static.yamblz.ru/music/sugrob.mp3',
        added: false,
        genre_id: 2,
      },
      {
        id: 48678,
        name: 'Сердце льда',
        artist: 'Павел Ковалёв',
        lyrics: null,
        image_url: null,
        mp3_url: 'https://static.yamblz.ru/music/heart_ice.mp3',
        added: false,
        genre_id: 0,
      }, {
        id: 123456,
        name: 'За окном опять сугробы',
        artist: 'Natalia Bystrova',
        lyrics: null,
        image_url: null,
        mp3_url: 'https://static.yamblz.ru/music/sugrob.mp3',
        added: false,
        genre_id: 2,
      },
    ],
  },
  listTracks: state.modal.listTracks || {},
  info: state.modal.listTracks || {},
}), { playerPlay, playerPause, playerModeUpdate })(ListTracks);

ListTracks.propTypes = {
  player: PropTypes.shape({
    playlist: PropTypes.array,
    trackId: PropTypes.number,
    isPlaying: PropTypes.bool,
  }),
  info: PropTypes.shape({
    title: PropTypes.string,
  }),
  listTracks: PropTypes.shape({
    inPlyaer: PropTypes.bool,
  }),
  playerInfo: PropTypes.shape({
    mode: PropTypes.string,
  }),
  playerModeUpdate: PropTypes.func,
  playerPause: PropTypes.func,
  playerPlay: PropTypes.func,
};
