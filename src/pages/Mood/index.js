import React, { Component } from 'react';
import { connect } from 'react-redux';
import { push } from 'react-router-redux';
import PropTypes from 'prop-types';

import ListEmoji from '_components/ListEmoji';
import ButtonNext from '_components/ButtonNext';
import ListLikes from '_components/ListLikes';

import { saveEmoji } from '_actions/mood';

import style from './style.scss';

const emoji = [
  { typeIcon: 'emoji-heart-eyes' },
  { typeIcon: 'emoji-angry' },
  { typeIcon: 'emoji-tongue-out' },
  { typeIcon: 'emoji-crying' },
  { typeIcon: 'emoji-sunglasses' },
  { typeIcon: 'emoji-spooky' },
  { typeIcon: 'emoji-zzz' },
  { typeIcon: 'emoji-sad' },
  { typeIcon: 'emoji-grin' },
];

class Mood extends Component {
  _onChange = (activeType) => {
    this.props.saveEmoji({ activeType });
  }

  _onMoveNextPage = () => {
    this.props.push({ pathname: '/action' });
  }

  render() {
    const { activeType } = this.props;

    return (
      <div className={style.container}>
        <ListLikes count={3} className={style.list} />
        <h1 className={style.title}>Выбери своё настроение!</h1>
        <ListEmoji
          className={style.list}
          data={serializeData(emoji, activeType)}
          onChange={this._onChange}
        />
        <ButtonNext
          onClick={this._onMoveNextPage}
          className={style.btn}
        />
      </div>
    );
  }
}

Mood.propTypes = {
  saveEmoji: PropTypes.func.isRequired,
  push: PropTypes.func.isRequired,
  activeType: PropTypes.string,
};


export default connect((state, props) => ({
  activeType: state.mood.activeType,
  ...props,
}), { saveEmoji, push })(Mood);


/**
 * Helpers
 */

function serializeData(data, activeType) {
  return data.map(item => (item.typeIcon === activeType
    ? { ...item, isActive: true }
    : { ...item, isActive: false }
  ));
}
