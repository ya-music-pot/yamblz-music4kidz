import React, { Component } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import Background from '_components/player/Background';
import Container from '_components/player/Container';
import * as PlayerActions from '_actions/player';

import style from './style.styl';

class Player extends Component {
  /**
   * @function _handleButtonPressed - Служит для обработки кликов по кнопке стой \ пой
   * Запускает и приостанавливает воспроизведение музыки
   * */
  _handleButtonPressed = () => {
    const { playerActions, player } = this.props;
    if (player.isPlaying) {
      playerActions.playerPause();
    } else if (player.position !== 0) {
      playerActions.playerResume();
    } else {
      playerActions.playerStart(player.trackId);
    }
  };

  _handleClickPrevious = () => {

  };

  _handleClickNext = () => {
    const { playerActions, player, data } = this.props;
    const { trackId, playlistId } = player;

    const playlist = data.find(item => item.id === playlistId);
    const track = playlist.tracks.find(item => item.id === trackId);
    const trackIndex = playlist.tracks.indexOf(track);

    if (trackIndex < playlist.tracks.length - 1) {
      const nextTrack = playlist.tracks[trackIndex + 1];

      playerActions.playerStart(nextTrack.id);
    } else {
      const firstTrack = playlist.tracks[0];

      playerActions.playerStop();
      playerActions.setTrackId(firstTrack.id);
    }
  };

  render() {
    const {
      trackName, singerName, position,
      cover, isPlaying, duration,
    } = this.props.player;

    const percentage = position / duration;
    const diffTrackPosition = position - duration;
    const minutesLeft = parseInt(diffTrackPosition / 60, 10).toString();
    const sec = -(parseInt(diffTrackPosition, 10) - minutesLeft * 60);
    const secondsLeft = (sec < 10 ? `0${sec}` : sec).toString();

    return (
      <div className={style.wrapper}>
        <Container
          trackName={trackName}
          singerName={singerName}
          trackPercentage={percentage}
          minutesLeft={minutesLeft}
          secondsLeft={secondsLeft}
          cover={cover}
          isPlaying={isPlaying}
          onTogglePlay={this._handleButtonPressed}
          onClickPrevious={this._handleClickPrevious}
          onClickNext={this._handleClickNext}
        />
        <Background
          cover={cover}
        />
      </div>
    );
  }
}

Player.propTypes = {
  player: PropTypes.shape({
    isPlaying: PropTypes.bool,
    cover: PropTypes.string,
    singerName: PropTypes.string,
    trackName: PropTypes.string,
    position: PropTypes.number,
    trackId: PropTypes.number,
    duration: PropTypes.number,
  }),
  data: PropTypes.arrayOf(PropTypes.object),
  playerActions: PropTypes.shape({
    playerStart: PropTypes.func,
    playerStop: PropTypes.func,
    playerPause: PropTypes.func,
    playerResume: PropTypes.func,
  }),
};

export default connect((state) => {
  const { player, feed } = state;
  const { data } = feed;

  return {
    player,
    data,
  };
}, (dispatch) => ({
  playerActions: bindActionCreators(PlayerActions, dispatch),
}))(Player);
