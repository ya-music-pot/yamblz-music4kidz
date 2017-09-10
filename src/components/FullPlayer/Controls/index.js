import React, { Component } from 'react';
import PropTypes from 'prop-types';
import cl from 'classname';

import Button from '_components/Button';
import CARDS from '_data/cardsType';

import style from '../style.styl';

export default class Controls extends Component {
  render() {
    const {
      onTogglePlay, onClickNext, onClickPrevious,
      isPlaying, cardType,
    } = this.props;

    let isPrevNeeded = true;
    switch (cardType) {
      case CARDS.radio:
      case CARDS.single:
      case CARDS.personal:
        isPrevNeeded = false;
        break;
      default:
        break;
    }

    const { controlsRow, buttonPrevious, buttonNext } = style;
    return (
      <div className={controlsRow}>
        { isPrevNeeded && <Button style={buttonPrevious} onClick={onClickPrevious} /> }
        <Button
          style={
            cl(
              style.playerButton,
              isPlaying ? style.playerButtonPause : style.playerButtonPlay,
            )
          }
          isPlaying={isPlaying}
          onClick={onTogglePlay}
        />
        { cardType !== CARDS.single && <Button style={buttonNext} onClick={onClickNext} /> }
      </div>
    );
  }
}

Controls.propTypes = {
  onTogglePlay: PropTypes.func,
  onClickPrevious: PropTypes.func,
  onClickNext: PropTypes.func,
  isPlaying: PropTypes.bool,
  cardType: PropTypes.number,
};
