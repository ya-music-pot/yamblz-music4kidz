import React, { Component } from 'react';
import PropTypes from 'prop-types';

import Button from '_components/Button';
import Icon from '_components/Icon';
import CARDS from '_data/cardsType';

import style from '../style.styl';

export default class Footer extends Component {
  renderPlaylistControl() {
    const {
      cardType, onClickSelector,
      callbacks: { openListTracks },
    } = this.props;

    if (cardType === CARDS.radio || cardType === CARDS.single) {
      return null;
    }

    if (cardType === CARDS.personal) {
      return <Icon onClick={onClickSelector} typeIcon={'magic'} className={style.icon} />;
    }

    return (
      <div>
        <Button style={style.buttonList} onClick={openListTracks}>
          <Icon className={style.icon} typeIcon="player-list" />
        </Button>
      </div>
    );
  }

  render() {
    const { isRepeatMode, callbacks, isAdded } = this.props;

    const {
      bottomRow, buttonPlus, buttonRepeatActive,
      buttonRepeat, trackAdded, buttonRepeatInactive,
    } = style;

    return (
      <div className={bottomRow}>
        <Button style={buttonPlus} onClick={callbacks.onPlusClick} >
          { isAdded ?
            <Icon typeIcon="check" className={trackAdded} /> :
            <Icon typeIcon="plus" />
          }
        </Button>
        { this.renderPlaylistControl() }
        <Button
          style={buttonRepeat}
          onClick={callbacks.onClickRepeat}
        >
          <Icon
            typeIcon="repeat"
            className={isRepeatMode ? buttonRepeatActive : buttonRepeatInactive}
          />
        </Button>
      </div>
    );
  }
}

Footer.propTypes = {
  onClickSelector: PropTypes.func,
  callbacks: PropTypes.objectOf(PropTypes.func),
  isRepeatMode: PropTypes.bool,
  cardType: PropTypes.number,
  isAdded: PropTypes.bool,
};
