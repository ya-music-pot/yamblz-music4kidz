import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

import ListEmoji from '_components/ListEmoji';
import { saveEmoji } from '_actions/settings';

import style from './style.styl';

class Mood extends Component {
  /**
   * _handleChange save new type of mood in global State
   * @param  {String} activeType
   */
  _handleChange = (moodId) => {
    this.props.saveEmoji(moodId);
  }

  render() {
    const { moodId, listEmoji } = this.props;

    return (
      <div className={style.container}>
        <ListEmoji
          className={style.list}
          data={serializeData(listEmoji, moodId)}
          onChange={this._handleChange}
        />
      </div>
    );
  }
}

Mood.propTypes = {
  saveEmoji: PropTypes.func.isRequired,
  listEmoji: PropTypes.shape({
    order: PropTypes.array,
    data: PropTypes.object,
  }),
  moodId: PropTypes.number,
};


export default connect((state, props) => ({
  moodId: state.settings.moodId,
  listEmoji: state.dictionaries.listEmoji,
  ...props,
}), { saveEmoji })(Mood);


/**
 * Helpers
 */
/**
 * [serializeData add to all items isActive false or true.]
 * @param  {Object} data
 * @param  {String} activeType
 * @return {Array}
 */
function serializeData({ order, data }, moodId) {
  return order.map((key) => (data[key].id === moodId
    ? { ...data[key], isActive: true }
    : { ...data[key], isActive: false }
  ));
}
