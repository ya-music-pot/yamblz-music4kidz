import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import { saveAction, saveEmoji } from '_actions/settings';
import { updateUser } from '_actions/user';
import { closeSelector } from '_actions/player';

import CircularListEmoji from '_components/CircularListEmoji';
import Button from '_components/Button';
import style from './style.styl';

class MoodSelector extends Component {
  state = {
    moodId: 1,
    actionId: 1,
  }

  _handleChangeEmoji = (id) => {
    this.setState({
      moodId: id,
    });
  }

  _handleChangeAction = (id) => {
    this.setState({
      actionId: id,
    });
  }

  _handleButtonClick = () => {
    const { userInfo, onCloseSelector } = this.props;
    this.props.updateUser({
      id: userInfo.id,
      actionId: this.state.actionId,
      moodId: this.state.moodId,
    });
    onCloseSelector();
  }

  render() {
    const { listEmoji, listActions, userInfo } = this.props;

    return (
      <div>
        <div className={style.circle}>
          <div className={style.ringBorderOuter} />
          <div className={style.ringBorderMiddle} />
          <div className={style.ringBorderInner} />
          <Button onClick={this._handleButtonClick} style={style.okButton}>
            <div className={style.okButtonTitle}>OK</div>
          </Button>
          <CircularListEmoji
            className={style.list}
            emojiData={serializeData(listEmoji, 1)}
            actionData={serializeData(listActions, 1)}
            onChangeEmoji={this._handleChangeEmoji}
            onChangeAction={this._handleChangeAction}
            userInfo={userInfo}
          />
        </div>
      </div>
    );
  }
}

MoodSelector.propTypes = {
  updateUser: PropTypes.func,
  userInfo: PropTypes.object,
  onCloseSelector: PropTypes.func,
  listEmoji: PropTypes.object,
  listActions: PropTypes.object,
};

export default connect((state, props) => {
  const { listEmoji, listActions } = state.dictionaries;
  return {
    listEmoji,
    listActions,
    ...props,
  };
}, { saveAction, saveEmoji, updateUser, closeSelector })(MoodSelector);

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
