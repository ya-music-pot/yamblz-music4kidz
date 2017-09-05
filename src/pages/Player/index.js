import React, { Component } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import Background from '_components/FullPlayer/Background';
import Container from '_components/FullPlayer/Container';
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
  playerActions: PropTypes.shape({
    playerStart: PropTypes.func,
    playerStop: PropTypes.func,
    playerPause: PropTypes.func,
    playerResume: PropTypes.func,
  }),
};

export default connect((state) => {
  const { player } = state;

  return {
    player,
  };
}, (dispatch) => ({
  playerActions: bindActionCreators(PlayerActions, dispatch),
}))(Player);
