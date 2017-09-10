import React, { Component } from 'react';
import PropTypes from 'prop-types';

import Button from '_components/Button';
import CARDS from '_data/cardsType';

import style from '../style.styl';

export default class Header extends Component {
  render() {
    // TODO: получать эмоции и класть name в стор
    const { onClickArrowDown, cardType } = this.props;
    const name = 'say my name';

    const { headerRow, buttonArrowDown, moodIcons } = style;
    return (
      <div className={headerRow}>
        <Button style={buttonArrowDown} onClick={onClickArrowDown} />
        <div className={moodIcons}>{getTitleByCard(cardType, name)}</div>
      </div>
    );
  }
}

Header.propTypes = {
  onClickArrowDown: PropTypes.func,
  cardType: PropTypes.number,
};

/*
  Helpers
 */

/**
 * get a title of player by cardType
 * @param  {String} cardType
 * @param  {String} name     [description]
 * @return {String|Null}
 */
function getTitleByCard(cardType, name) {
  switch (cardType) {
    case CARDS.radio:
      return `Радио ${name}`;
    case CARDS.single:
      return 'Модный трек';
    case CARDS.game:
      return 'Слушай и играй';
    case CARDS.personal:
      return 'emoji';
    default:
      return null;
  }
}
