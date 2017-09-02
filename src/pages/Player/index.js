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
    playerActions.playerStart(player.trackId);
  };

  render() {
    const playerState = this.props.player;

    return (
      <div className={style.wrapper}>
        <Container
          trackName={playerState.trackName}
          singerName={playerState.singerName}
          trackPercentage={playerState.trackPercentage}
          minutesLeft={playerState.minutesLeft}
          secondsLeft={playerState.secondsLeft}
          cover={playerState.cover}
          isPlaying={playerState.isPlaying}
          onTogglePlay={this._handleButtonPressed}
        />
        <Background
          cover={playerState.cover}
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
    trackPersentage: PropTypes.number,
    trackId: PropTypes.number,
    minutesLeft: PropTypes.string,
    secondsLeft: PropTypes.string,
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
