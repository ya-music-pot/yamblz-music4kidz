import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Hammer from 'hammerjs';

import Icon from '_components/Icon';
import style from './style.styl';

export default class ListEmoji extends Component {
  constructor(props) {
    super(props);
    const { userInfo, emojiData, actionData } = this.props;
    this.state = {
      activeEmojiId: userInfo.moodId - 1,
      activeActionId: userInfo.actionId - 1,
      angleEmoji: (userInfo.moodId - 1) * (-360 / (emojiData.length * 2)),
      angleAction: (userInfo.actionId - 1) * (-360 / (actionData.length * 2)),
    };
  }

  componentDidMount() {
    this.hammerEmojiCircle = Hammer(this.emojiRing);
    this.hammerEmojiCircle.on('panleft', this._emojiRingLeft);
    this.hammerEmojiCircle.on('panright', this._emojiRingRight);

    this.hammerActionCircle = Hammer(this.actionRing);
    this.hammerActionCircle.on('panleft', this._actionRingLeft);
    this.hammerActionCircle.on('panright', this._actionRingRight);
  }

  _animate = (draw, duration, calcId) => {
    const start = window.performance.now();
    window.requestAnimationFrame(function frameIteration(time) {
      let timePassed = time - start;
      if (timePassed > duration) {
        timePassed = duration;
        calcId();
      }
      draw(timePassed);
      if (timePassed < duration) {
        window.requestAnimationFrame(frameIteration);
      }
    });
  }

  _calculateEmojiId = () => {
    const { onChangeEmoji, emojiData } = this.props;
    const stepEmoji = 360 / (emojiData.length * 2);
    let id = Math.abs(parseInt((-this.state.angleEmoji + stepEmoji / 2) / stepEmoji, 10));
    id = (id >= 9) ? id - Math.floor(id / 9) * 9 + 1 : id + 1;
    if (this.state.angleEmoji > 0) {
      id = emojiData.length - id + 1;
    }
    if (this.state.activeEmojiId !== id) {
      this.setState({
        activeEmojiId: id,
      });
      onChangeEmoji(this.state.activeEmojiId);
    }
  }

  _calculateActionId = () => {
    const { onChangeAction, actionData } = this.props;
    const stepAction = 360 / (actionData.length * 2);
    let id = Math.abs(parseInt((-this.state.angleAction + stepAction / 2) / stepAction, 10));
    id = (id >= 9) ? id - Math.floor(id / 9) * 9 + 1 : id + 1;
    if (this.state.angleAction > 0) {
      id = actionData.length - id + 1;
    }
    if (this.state.activeActionId !== id) {
      this.setState({
        activeActionId: id,
      });
      onChangeAction(this.state.activeActionId);
    }
  }

  _calcDelta = (deltaX) => deltaX / 100

  _emojiRing = (target) => {
    this.emojiRing = target;
  }

  _emojiRingLeft = (e) => {
    const animLength = 200;
    this._animate((t) => {
      this.setState({
        angleEmoji: this.state.angleEmoji - (Math.abs(e.velocityX) * (animLength - t) / animLength),
      });
    }, animLength, this._calculateEmojiId);
  }

  _emojiRingRight = (e) => {
    const animLength = 200;
    this._animate((t) => {
      this.setState({
        angleEmoji: this.state.angleEmoji + (Math.abs(e.velocityX) * (animLength - t) / animLength),
      });
    }, animLength, this._calculateEmojiId);
  }

  _actionRing = (target) => {
    this.actionRing = target;
  }

  _actionRingLeft = (e) => {
    const animLength = 200;
    this._animate((t) => {
      this.setState({
        angleAction: this.state.angleAction -
        (Math.abs(e.velocityX) * (animLength - t) / animLength),
      });
    }, animLength, this._calculateActionId);
  }

  _actionRingRight = (e) => {
    const animLength = 200;
    this._animate((t) => {
      this.setState({
        angleAction: this.state.angleAction +
        (Math.abs(e.velocityX) * (animLength - t) / animLength),
      });
    }, animLength, this._calculateActionId);
  }

  _transformOuterRing(id) {
    const radius = 75;
    const stepRadians = Math.PI / 9;

    const x = -(id - 1) * 32 - 16;
    const y = -16;
    const dx = -radius * Math.cos((id - 1) * stepRadians + Math.PI / 2);
    const dy = -radius * Math.sin((id - 1) * stepRadians + Math.PI / 2);

    return {
      transform: `translateX(${x}px) translateY(${y}px) translateY(${dy}vw) translateX(${dx}vw`,
    };
  }

  _transformInnerRing(id) {
    const radius = 55;
    const stepRadians = Math.PI / 9;

    const x = -(id - 1) * 32 - 16;
    const y = -16;
    const dx = -radius * Math.cos((id - 1) * stepRadians + Math.PI / 2);
    const dy = -radius * Math.sin((id - 1) * stepRadians + Math.PI / 2);

    return {
      transform: `translateX(${x}px) translateY(${y}px) translateY(${dy}vw) translateX(${dx}vw)`,
    };
  }

  _spacerCorrection(angle) {
    return {
      transform: `rotate(${angle}deg)`,
    };
  }

  _shift = () => {
    const margin = window.innerWidth;
    return {
      marginTop: `${margin}px`,
    };
  }

  render() {
    const { emojiData, actionData } = this.props;

    const newEmojiList = [];
    const newActionList = [];

    for (let i = 0; i < 2; i += 1) {
      emojiData.map(({ id, typeIcon }) => (
        newEmojiList.push({
          id: id + emojiData.length * i,
          typeIcon,
        })
      ));
    }

    for (let i = 0; i < 2; i += 1) {
      actionData.map(({ id, typeIcon }) => (
        newActionList.push({
          id: id + actionData.length * i,
          typeIcon,
        })
      ));
    }

    return (
      <div className={style.wrapper} style={this._shift()}>
        <div className={style.title}>Настройка</div>
        <div
          ref={this._emojiRing}
          className={style.emojiRing}
          style={{ transform: `rotate(${this.state.angleEmoji}deg)` }}
        >
          <ul className={style.emojiList}>
            {
              newEmojiList.map(({ id, typeIcon }) => (
                <li
                  key={typeIcon + id}
                  className={style.item}
                  style={this._transformOuterRing(id)}
                >
                  <div style={{ transform: `rotate(${-this.state.angleEmoji}deg)` }}>
                    <Icon
                      typeIcon={`${typeIcon}-small`}
                    />
                  </div>
                  <div
                    className={style.spacer}
                    style={{ transform: `rotate(${-this.state.angleEmoji}deg)` }}
                  />
                </li>
              ))
            }
          </ul>
        </div>
        <div
          ref={this._actionRing}
          className={style.actionRing}
          style={{ transform: `rotate(${this.state.angleAction}deg)` }}
        >
          <ul className={style.actionList}>
            { newActionList.map(({ id, typeIcon }) => (
              <li
                key={typeIcon + id}
                className={style.item}
                style={this._transformInnerRing(id)}
              >
                <div style={{ transform: `rotate(${-this.state.angleAction}deg)` }}>
                  <Icon
                    typeIcon={`${typeIcon}-small`}
                  />
                </div>
                <div
                  className={style.spacer}
                  style={{ transform: `rotate(${-this.state.angleAction}deg)` }}
                />
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
  userInfo: PropTypes.object,
};
