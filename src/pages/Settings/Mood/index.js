import React, { Component } from 'react';
import { connect } from 'react-redux';
import { push } from 'react-router-redux';
import PropTypes from 'prop-types';

import ListEmoji from '_components/ListEmoji';

import { saveEmoji } from '_actions/settings';

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
        <ListEmoji
          className={style.list}
          data={serializeData(listEmoji, activeType)}
          onChange={this._onChange}
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
  activeType: state.settings.activeEmoji,
  listEmoji: state.dictionaries.listEmoji,
  ...props,
}), { saveEmoji, push })(Mood);


/**
 * Helpers
 */

function serializeData(data, activeType) {
  return data.map((item) => (item.typeIcon === activeType
    ? { ...item, isActive: true }
    : { ...item, isActive: false }
  ));
}
