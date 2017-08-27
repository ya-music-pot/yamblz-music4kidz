import React, { Component } from 'react';
import { connect } from 'react-redux';
import { push } from 'react-router-redux';
import PropTypes from 'prop-types';

import ListEmoji from '_components/ListEmoji';
import ButtonNext from '_components/ButtonNext';
import ListLikes from '_components/ListLikes';

import { saveEmoji } from '_actions/mood';

import style from './style.scss';

class Mood extends Component {
  _onChange = (activeType) => {
    this.props.saveEmoji({ activeType });
  }

  _onMoveNextPage = () => {
    this.props.history.push('/action');
  }

  render() {
    const { activeType, listEmoji } = this.props;

    return (
      <div className={style.container}>
        <ListLikes count={3} className={style.list} />
        <h1 className={style.title}>Выбери своё настроение!</h1>
        <ListEmoji
          className={style.list}
          data={serializeData(listEmoji, activeType)}
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
  listEmoji: PropTypes.arrayOf(
    PropTypes.shape({
      title: PropTypes.string,
    }),
  ).isRequired,
  history: PropTypes.object,
  activeType: PropTypes.string,
};


export default connect((state, props) => ({
  activeType: state.mood.activeType,
  listEmoji: state.dictionaries.listEmoji,
  ...props,
}), { saveEmoji, push })(Mood);


/**
 * Helpers
 */

function serializeData(data, activeType) {
  return data.map(({ title }) => (title === activeType
    ? { typeIcon: title, isActive: true }
    : { typeIcon: title, isActive: false }
  ));
}
