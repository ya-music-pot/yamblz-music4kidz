import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

import { playerModeUpdate } from '_actions/playerInfo';
import TrackInfo from '_components/TrackInfo';
import { playerPlay, playerPause } from '_actions/player';
import { runPlayer } from '_helpers/cardCallbacks';

import style from './style.styl';

class ListTracks extends Component {
  _onTogglePlay = (id) => {
    const { cardParams, player, playerInfo } = this.props;
    const { isPlaying, trackId } = player;
    const { mode } = playerInfo;

    if (!mode) this.props.playerModeUpdate('mini');

    if (id === trackId && isPlaying) {
      this.props.playerPause();
      return;
    }

    if (cardParams) {
      runPlayer({
        ...cardParams,
        trackId: id,
      });
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
    const { info, player } = this.props;
    const { cardParams } = this.props;

    const playlist = cardParams ? cardParams.playlist : player.playlist;
    const { trackId, isPlaying } = player;

    return playlist && playlist.length && (
      <div>
        { info.title && <h3 className={style.title}>{info.title}</h3> }
        <div>
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
  // TODO: подумать над логикой хранения текущих плейлистов
  // и остальных.
  cardParams: PropTypes.object,
  playerModeUpdate: PropTypes.func,
  playerPause: PropTypes.func,
  playerPlay: PropTypes.func,
};
