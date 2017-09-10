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
      onClickRepeat, onClickArrowDown, cardType,
      openListTracks,
    } = this.props;

    return (
      <div>
        <Container
          playerState={playerState}
          onTogglePlay={onTogglePlay}
          openListTracks={openListTracks}
          onClickNext={onClickNext}
          onClickPrevious={onClickPrevious}
          onClickRepeat={onClickRepeat}
          onClickArrowDown={onClickArrowDown}
          cardType={cardType}
        />
      </div>
    );
  }
}

FullPlayer.propTypes = {
  playerState: PropTypes.object,
  onTogglePlay: PropTypes.func,
  openListTracks: PropTypes.func,
  onClickPrevious: PropTypes.func,
  onClickNext: PropTypes.func,
  onClickRepeat: PropTypes.func,
  onClickArrowDown: PropTypes.func,
  cardType: PropTypes.number,
};
