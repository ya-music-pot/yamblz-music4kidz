import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Container from '_components/FullPlayer/Container';

export default class FullPlayer extends Component {
  /**
   * @function _handleButtonPressed - Служит для обработки кликов по кнопке стой \ пой
   * Запускает и приостанавливает воспроизведение музыки
   * */

  render() {
    const playerState = this.props.playerState;
    const {
      onTogglePlay, onClickNext, onClickPrevious,
      onClickRepeat,
    } = this.props;

    return (
      <div>
        <Container
          playerState={playerState}
          onTogglePlay={onTogglePlay}
          onClickNext={onClickNext}
          onClickPrevious={onClickPrevious}
          onClickRepeat={onClickRepeat}
        />
      </div>
    );
  }
}

FullPlayer.propTypes = {
  playerState: PropTypes.object,
  onTogglePlay: PropTypes.func,
  onClickPrevious: PropTypes.func,
  onClickNext: PropTypes.func,
  onClickRepeat: PropTypes.func,
};
