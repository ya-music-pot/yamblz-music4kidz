import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import { saveAction, saveEmoji } from '_actions/settings';
import { updateUser } from '_actions/user';
import { closeSelector } from '_actions/player';

import CircularListEmoji from '_components/CircularListEmoji';
import style from './style.styl';

class MoodSelector extends Component {
  constructor(props) {
    super(props);
    const { userInfo } = this.props;
    this.state = {
      moodId: userInfo.moodId,
      actionId: userInfo.actionId,
      height: 0,
    };
  }

  componentDidMount() {
    window.addEventListener('resize', this._handleClick);
  }

  _handleClick = () => {
    const height = window.innerHeight;
    this.setState({
      height,
    });
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

  _shift = () => {
    const margin = window.innerHeight - 250;
    return {
      marginTop: `${margin}px`,
    };
  }

  render() {
    const { listEmoji, listActions, userInfo } = this.props;

    return (
      <div>
        <div className={style.circle} style={this._shift()}>
          <div className={style.ringBorderOuter} style={this._shift()} />
          <div className={style.ringBorderMiddle} style={this._shift()} />
          <div className={style.ringBorderInner} style={this._shift()} />
          <div
            className={style.ringOk}
            style={this._shift()}
            onClick={this._handleButtonClick}
          >
            <div className={style.ringOkTitle}>OK</div>
          </div>
          <CircularListEmoji
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
