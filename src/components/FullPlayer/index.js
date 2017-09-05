import React, { Component } from 'react';
// import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import Container from '_components/FullPlayer/Container';

export default class FullPlayer extends Component {
  /**
   * @function _handleButtonPressed - Служит для обработки кликов по кнопке стой \ пой
   * Запускает и приостанавливает воспроизведение музыки
   * */
  _handleButtonPressed = () => {
    console.log('play');
  };

  render() {
    const playerState = this.props.playerState;

    return (
      <div>
        <Container
          playerState={playerState}
          onTogglePlay={this._handleButtonPressed}
        />
      </div>
    );
  }
}

FullPlayer.propTypes = {
  playerState: PropTypes.object,
};
