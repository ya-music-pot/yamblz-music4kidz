import React, { Component } from 'react';
import PropTypes from 'prop-types';

import Button from '_components/Button';
import Icon from '_components/Icon';

import CARDS from '_data/cardsType';

import style from '../style.styl';

export default class Footer extends Component {
  _handleClickPlus = () => {}

  renderPlaylistControl() {
    const { cardType, openListTracks } = this.props;

    if (cardType === CARDS.radio || cardType === CARDS.single) {
      return null;
    }

    if (cardType === CARDS.personal) {
      return <div>balloon</div>;
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
    const { onClickRepeat, isRepeatMode } = this.props;

    const {
      bottomRow, buttonPlus, buttonRepeatActive,
      buttonRepeatInactive,
    } = style;

    return (
      <div className={bottomRow}>
        <Button style={buttonPlus} onClick={this._handleClickPlus} />
        { this.renderPlaylistControl() }
        <Button
          style={isRepeatMode ? buttonRepeatActive : buttonRepeatInactive}
          onClick={onClickRepeat}
        />
      </div>
    );
  }
}

Footer.propTypes = {
  onClickRepeat: PropTypes.func,
  openListTracks: PropTypes.func,
  isRepeatMode: PropTypes.bool,
  cardType: PropTypes.number,
};
