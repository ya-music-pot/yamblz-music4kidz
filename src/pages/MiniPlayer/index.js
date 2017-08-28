import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

class MiniPlayer extends Component {
  state = {
    shouldPlayMusic: false,
  };

  componentWillMount() {
    this.yaPlayer = this.context.yaPlayer;
    if (this.yaPlayer) {
      this._initPlayer();
    }
  }

  componentWillReceiveProps(nextProps, nextContext) {
    if (this.context.yaPlayer !== nextContext.yaPlayer && nextContext.yaPlayer) {
      this.yaPlayer = nextContext.yaPlayer;
      this._initPlayer();
    }
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
      alert(playerError);
      return;
    }

    this.yaPlayer.setPlaylist(playlist);

    this.yaPlayer.setTrackDataCallback(() => {
      console.log(this.yaPlayer.getFullTrackData());
    });

    this.yaPlayer.setTimeUpdateCallback(() => {
      console.log(this.yaPlayer.getCurrentTrackPosition());
    });
  };

  /**
   * @function _handleButtonPressed - Служит для обработки кликов по кнопке стой \ пой
   * Запускает и приостанавливает воспроизведение музыки
   * */
  _handleButtonPressed = () => {
    const shouldPlayMusic = !this.state.shouldPlayMusic;
    if (this.state.shouldPlayMusic) {
      this.yaPlayer.pause();
    } else {
      this.yaPlayer.play();
    }

    this.setState({ shouldPlayMusic });
  };

  render() {
    return (
      this.yaPlayer && !this.yaPlayer.getPlayerError() &&
      <div>
        <button onClick={this._handleButtonPressed}>
          {this.state.shouldPlayMusic ? 'Музыка стой' : 'Музыка пой'}
        </button>
      </div>

    );
  }
}

export default connect((state, props) => ({
  ...state,
  ...props,
}))(MiniPlayer);

MiniPlayer.contextTypes = {
  yaPlayer: PropTypes.object,
};

const playlist = {
  title: 'some playlist',
  tracks: [
    '57730',
    '57730',
    '57730',
  ],
};
