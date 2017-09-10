import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

import TrackInfo from '_components/TrackInfo';
import { playerPlay, playerPause } from '_actions/player';

import style from './style.styl';

class ListTracks extends Component {
  _onTogglePlay = (id) => {
    const { isPlaying, trackId } = this.props.player;

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
    const { playlist, trackId, isPlaying } = this.props.player;

    return playlist && playlist.length && (
      <div>
        <h3 className={style.title}>Что сейчас играет</h3>
        <div className={style.list}>
          { playlist.map((item) => this.renderTrack(item, trackId, isPlaying))}
        </div>
      </div>
    );
  }
}

export default connect((state, props) => ({
  ...props,
  player: state.player,
}), { playerPlay, playerPause })(ListTracks);

ListTracks.propTypes = {
  player: PropTypes.shape({
    playlist: PropTypes.array,
    trackId: PropTypes.number,
    isPlaying: PropTypes.bool,
  }),
  playerPause: PropTypes.func,
  playerPlay: PropTypes.func,
};
