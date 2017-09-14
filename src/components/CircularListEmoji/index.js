import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Hammer from 'hammerjs';

import Icon from '_components/Icon';
import style from './style.styl';

export default class ListEmoji extends Component {
  state = {
    activeEmojiId: 4,
    activeActionId: 4,
  }

  componentDidMount() {
    this.hammerEmojiCircle = Hammer(this.emojiRing);
    this.hammerEmojiCircle.on('panleft', this._emojiRingLeft);
    this.hammerEmojiCircle.on('panright', this._emojiRingRight);

    this.hammerActionCircle = Hammer(this.actionRing);
    this.hammerActionCircle.on('panleft', this._actionRingLeft);
    this.hammerActionCircle.on('panright', this._actionRingRight);
  }

  _emojiRing = (target) => {
    this.emojiRing = target;
  }

  _emojiRingLeft = (e) => {
    const { onChangeEmoji } = this.props;
    const delta = parseInt(e.deltaX / 100, 10);

    if (delta !== this.state.delta) {
      this.setState({
        activeEmojiId: Math.min(this.state.activeEmojiId + 1, 9),
      });
    }
    onChangeEmoji(this.state.activeEmojiId + 1);
    this.setState({
      delta,
    });
  }

  _emojiRingRight = (e) => {
    const { onChangeEmoji } = this.props;
    const delta = parseInt(e.deltaX / 100, 10);

    if (delta !== this.state.delta) {
      this.setState({
        activeEmojiId: Math.max(this.state.activeEmojiId - 1, 0),
      });
    }
    onChangeEmoji(this.state.activeEmojiId + 1);
    this.setState({
      delta,
    });
  }

  _actionRing = (target) => {
    this.actionRing = target;
  }

  _actionRingLeft = (e) => {
    const { onChangeAction } = this.props;
    const delta = parseInt(e.deltaX / 100, 10);

    if (delta !== this.state.delta) {
      this.setState({
        activeActionId: Math.min(this.state.activeActionId + 1, 9),
      });
    }
    onChangeAction(this.state.activeActionId + 1);
    this.setState({
      delta,
    });
  }

  _actionRingRight = (e) => {
    const { onChangeAction } = this.props;
    const delta = parseInt(e.deltaX / 100, 10);

    if (delta !== this.state.delta) {
      this.setState({
        activeActionId: Math.max(this.state.activeActionId - 1, 0),
      });
    }
    onChangeAction(this.state.activeActionId + 1);
    this.setState({
      delta,
    });
  }

  _transformOuterRing(id) {
    const radius = 75; // 50 - радиус кольца с emoji
    const stepRadians = Math.PI / 9;

    const x = -(id - 1) * 32 - 16;
    const y = -16;
    const dx = -radius * Math.cos((id - 1 - this.state.activeEmojiId) * stepRadians + Math.PI / 2);
    const dy = -radius * Math.sin((id - 1 - this.state.activeEmojiId) * stepRadians + Math.PI / 2);

    return {
      transform: `translateX(${x}px) translateY(${y}px) translateY(${dy}vw) translateX(${dx}vw`,
      transformOrigin: 'center center',
    };
  }

  _transformInnerRing(id) {
    const radius = 55; // 45 - радиус кольца с action
    const stepRadians = Math.PI / 9;

    const x = -(id - 1) * 32 - 16;
    const y = -16;
    const dx = -radius * Math.cos((id - 1 - this.state.activeActionId) * stepRadians + Math.PI / 2);
    const dy = -radius * Math.sin((id - 1 - this.state.activeActionId) * stepRadians + Math.PI / 2);

    return {
      transform: `translateX(${x}px) translateY(${y}px) translateY(${dy}vw) translateX(${dx}vw)`,
      transformOrigin: 'center center',
    };
  }

  _spacerCorrection() {
    const y = -36;
    return {
      transform: `translateY(${y}px)`,
    };
  }

  render() {
    const { emojiData, actionData } = this.props;

    const emojiList = emojiData;
    const actionList = actionData;

    return (
      <div className={style.wrapper}>
        <div className={style.title}>Настройка</div>
        <div ref={this._emojiRing} className={style.emojiRing}>
          <ul className={style.emojiList}>
            {
              emojiList.map(({ id, typeIcon }) => (
                <li
                  key={typeIcon}
                  className={style.item}
                  style={this._transformOuterRing(id)}
                >
                  <Icon
                    typeIcon={`${typeIcon}-small`}
                  />
                  <div className={style.spacer} style={this._spacerCorrection(id)} />
                </li>
              ))
            }
          </ul>
        </div>
        <div ref={this._actionRing} className={style.actionRing}>
          <ul className={style.actionList}>
            { actionList.map(({ id, typeIcon }) => (
              <li
                key={typeIcon}
                className={style.item}
                style={this._transformInnerRing(id)}
              >
                <Icon
                  typeIcon={`${typeIcon}-small`}
                />
                <div className={style.spacer} style={this._spacerCorrection(id)} />
              </li>
            ))}
          </ul>
        </div>
      </div>
    );
  }
}

ListEmoji.propTypes = {
  emojiData: PropTypes.arrayOf(
    PropTypes.shape({
      typeIcon: PropTypes.string.isRequired,
    }),
  ).isRequired,
  actionData: PropTypes.arrayOf(
    PropTypes.shape({
      typeIcon: PropTypes.string.isRequired,
    }),
  ).isRequired,
  onChangeAction: PropTypes.func,
  onChangeEmoji: PropTypes.func,
};
