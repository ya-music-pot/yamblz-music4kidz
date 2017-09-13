import React, { Component } from 'react';
import PropTypes from 'prop-types';

import Button from '_components/Button';
import EmojiStatus from '_components/EmojiStatus';
import CARDS from '_data/cardsType';

import style from '../style.styl';

export default class Header extends Component {
  render() {
    const {
      onClickArrowDown, cardType, cardTitle,
      emojiStatus,
    } = this.props;

    const { headerRow, buttonArrowDown, playerTitle } = style;
    return (
      <div className={headerRow}>
        <Button style={buttonArrowDown} onClick={onClickArrowDown} />
        <div className={playerTitle}>
          {getTitleByCard(cardType, cardTitle, emojiStatus)}
        </div>
      </div>
    );
  }
}

Header.propTypes = {
  onClickArrowDown: PropTypes.func,
  cardType: PropTypes.number,
  cardTitle: PropTypes.string,
  emojiStatus: PropTypes.object,
};

/*
 Helpers
 */

/**
 * get a title of player by cardType
 * @param {String} cardType
 * @param {String} name     [description]
 * @param {Object} emojiStatus
 * @return {String|Null}
 */
function getTitleByCard(cardType, name, emojiStatus) {
  switch (cardType) {
    case CARDS.radio:
      return `Радио ${name}`;
    case CARDS.single:
      return 'Модный трек';
    case CARDS.game:
      return 'Слушай и играй';
    case CARDS.personal:
      return (<EmojiStatus
        settings={emojiStatus}
        styles={style.emojiStyles}
      />);
    default:
      return name;
  }
}
