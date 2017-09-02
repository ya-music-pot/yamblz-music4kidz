import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import Background from '_components/player/Background';
import Container from '_components/player/Container';
import YaPlayer from '_helpers/YaPlayer';

import style from './style.styl';

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

  componentWillMount() {
    this.yaPlayer = new YaPlayer();
    this.yaPlayer.loadPlayerScript(
      () => {
        console.log(this.yaPlayer);
        this._initPlayer();
      },
    );
  }

  /**
   * @function _initPlayer - Служит для инциаллизации плеера
   * @example - Добавить плейлист, если нужно запустить плеер, добавить слушателей событий
   *
   * Вызывается при успешной инициаллизации библиотеки Ya на странице
   * */
  _initPlayer = () => {
    const playerError = this.yaPlayer.getPlayerError();
    if (playerError) {
      console.log(playerError);
      return;
    }

    this.yaPlayer.setTrackDataCallback(() => {
      const covers = this.yaPlayer.getCurrentTrackCoverUris();

      this.setState({
        playerState: {
          ...this.state.playerState,
          trackName: this.yaPlayer.getCurrentTrackTitle(),
          singerName: this.yaPlayer.getCurrentTrackArtists()[0].name,
          cover: covers[covers.length - 1],
        },
      });
    });

    this.yaPlayer.setTimeUpdateCallback(() => {
      const currentTrackPosition = this.yaPlayer.getCurrentTrackPosition();
      const currentTrackDuration = this.yaPlayer.getCurrentTrackDuration();

      if (currentTrackDuration) {
        const trackPercentage = currentTrackPosition / currentTrackDuration;
        const diffTrackPosition = currentTrackPosition - currentTrackDuration;
        const minutesLeft = parseInt(diffTrackPosition / 60, 10);
        const sec = -(parseInt(diffTrackPosition, 10) - minutesLeft * 60);
        const secondsLeft = (sec < 10 ? `0${sec}` : sec).toString();

        this.setState({
          playerState: {
            ...this.state.playerState,
            trackPercentage,
            minutesLeft: minutesLeft.toString(),
            secondsLeft,
          },
        });
      }
    });
  };

  /**
   * @function _handleButtonPressed - Служит для обработки кликов по кнопке стой \ пой
   * Запускает и приостанавливает воспроизведение музыки
   * */
  _handleButtonPressed = () => {
    let playState;

    if (!this.yaPlayer.isPlaying()) {
      // TODO плейлисты в карточки будут приходить из store
      const playList = {
        title: 'music',
        tracks: [
          '36481295',
        ],
      };

      this.yaPlayer.setPlaylist(playList);
      this.yaPlayer.play();
      playState = true;
    } else {
      this.yaPlayer.pause();
      playState = false;
    }

    setTimeout(() => {
      const playerState = this.state.playerState;

      this.setState({
        playerState: Object.assign({}, playerState, {
          isPlaying: playState,
        }),
      });
    }, 0);
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

Player.contextTypes = {
  yaPlayer: PropTypes.object,
};
