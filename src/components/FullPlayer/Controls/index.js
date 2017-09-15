import React, { Component } from 'react';
import PropTypes from 'prop-types';
import cl from 'classname';

import Button from '_components/Button';
import CARDS from '_data/cardsType';
import style from '../style.styl';

export default class Controls extends Component {
  render() {
    const { isPlaying, cardType, callbacks } = this.props;
    const { onTogglePlay, onClickNext, onClickPrevious } = callbacks;

    const {
      controlsRow, buttonPrevious, buttonNext,
      flexEnd, playerButton, playerButtonPause,
      playerButtonPlay,
    } = style;

    let controlsRowStyles = controlsRow;
    let isPrevNeeded = true;
    let isNextNeeded = true;

    switch (cardType) {
      case CARDS.radio:
      case CARDS.personal:
        isPrevNeeded = false;
        controlsRowStyles = cl(controlsRow, flexEnd);
        break;
      case CARDS.single:
        isPrevNeeded = false;
        isNextNeeded = false;
        break;
      default:
        break;
    }

    return (
      <div className={controlsRowStyles}>
        { isPrevNeeded && <Button style={buttonPrevious} onClick={onClickPrevious} /> }
        <Button
          style={
            cl(
              playerButton,
              isPlaying ? playerButtonPause : playerButtonPlay,
            )
          }
          isPlaying={isPlaying}
          onClick={onTogglePlay}
        />
        { isNextNeeded && <Button style={buttonNext} onClick={onClickNext} /> }
      </div>
    );
  }
}

Controls.propTypes = {
  callbacks: PropTypes.objectOf(PropTypes.func),
  isPlaying: PropTypes.bool,
  cardType: PropTypes.number,
};
