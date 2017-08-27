import React, { Component } from 'react';
import { connect } from 'react-redux';
import { push } from 'react-router-redux';
import PropTypes from 'prop-types';

import ListActions from '_components/ListActions';
import ButtonNext from '_components/ButtonNext';
import ListLikes from '_components/ListLikes';

import { saveEmoji } from '_actions/mood';

import style from './style.scss';

class Action extends Component {
  _onChange = (activeType) => {
    // this.props.saveEmoji({ activeType });
  }

  _onMoveNextPage = () => {
    this.props.history.push({ pathname: '/playlist' });
  }

  render() {
    const { activeType, listActions } = this.props;

    return (
      <div className={style.container}>
        <ListLikes count={3} className={style.list} />
        <h1 className={style.title}>Чем будешь заниматься?</h1>
        <ListActions
          className={style.list}
          data={serializeData(listActions, activeType)}
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

Action.propTypes = {
  activeType: PropTypes.string,
};


export default connect((state, props) => ({
  activeType: state.mood.activeType,
  listActions: state.dictionaries.listActions,
  ...props,
}), { saveEmoji, push })(Action);


/**
 * Helpers
 */

function serializeData(data, activeType) {
  return data.map(({ title }) => (title === activeType
    ? { typeIcon: title, isActive: true }
    : { typeIcon: title, isActive: false }
  ));
}
