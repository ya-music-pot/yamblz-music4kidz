import React, { Component } from 'react';
// import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import Container from '_components/FullPlayer/Container';

export default class FullPlayer extends Component {
  /**
   * @function _handleButtonPressed - Служит для обработки кликов по кнопке стой \ пой
   * Запускает и приостанавливает воспроизведение музыки
   * */
  _handlePlayButton = () => {
    console.log('play');
  };

  _handleNextButton = () => {
    console.log('next');
  };

  _handlePreviousButton = () => {
    console.log('previous');
  };

  _handleRepeatButton = () => {
    console.log('repeat');
  };

  render() {
    const playerState = this.props.playerState;

    return (
      <div>
        <Container
          playerState={playerState}
          onTogglePlay={this._handlePlayButton}
          onClickNext={this._handleNextButton}
          onClickPrevious={this._handlePreviousButton}
          onClickRepeat={this._handleRepeatButton}
        />
      </div>
    );
  }
}

FullPlayer.propTypes = {
  playerState: PropTypes.object,
};
