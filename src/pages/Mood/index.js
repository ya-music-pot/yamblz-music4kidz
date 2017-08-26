import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

import ListEmoji from '_components/ListEmoji';
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

  render() {
    const { activeType } = this.props;

    return (
      <div className={style.container}>
        <h1 className={style.title}>Выбери своё настроение!</h1>
        <ListEmoji
          data={serializeData(emoji, activeType)}
          onChange={this._onChange}
        />
      </div>
    );
  }
}

Mood.propTypes = {
  saveEmoji: PropTypes.func.isRequired,
  activeType: PropTypes.string,
};


export default connect((state, props) => ({
  activeType: state.mood.activeType,
  ...props,
}), { saveEmoji })(Mood);


/**
 * Helpers
 */

function serializeData(data, activeType) {
  return data.map(item => (item.typeIcon === activeType
    ? { ...item, isActive: true }
    : { ...item, isActive: false }
  ));
}
