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
    const { info, player, playerInfo } = this.props;
    const { playlist, trackId, isPlaying } = player;

    return playlist && playlist.length && (
      <div>
        <h3 className={style.title}>{info.title}</h3>
        <div className={playerInfo.mode && style.listShift}>
          { playlist.map((item) => this.renderTrack(item, trackId, isPlaying))}
        </div>
      </div>
    );
  }
}

export default connect((state, props) => ({
  ...props,
  player: state.player,
  playerInfo: state.playerInfo,
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
  playerInfo: PropTypes.shape({
    mode: PropTypes.string,
  }),
  playerModeUpdate: PropTypes.func,
  playerPause: PropTypes.func,
  playerPlay: PropTypes.func,
};
