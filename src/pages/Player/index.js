import React, { Component } from 'react';
import { connect } from 'react-redux';
import Background from '_components/player/Background';
import Container from '_components/player/Container';

import style from './style.scss';

class Player extends Component {
  state = {
    playerState: {
      trackName: '',
      singerName: '',
      trackPercentage: 0,
      minutesLeft: '',
      secondsLeft: '',
      isPlaying: false,
      cover: '',
    },
  };

  /**
   * @function _handleButtonPressed - Служит для обработки кликов по кнопке стой \ пой
   * Запускает и приостанавливает воспроизведение музыки
   * */
  _handleButtonPressed = () => {
    console.log('play')
  };

  render() {
    const playerState = this.state.playerState;

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

export default connect((state, props) => ({
  ...props,
}))(Player);
