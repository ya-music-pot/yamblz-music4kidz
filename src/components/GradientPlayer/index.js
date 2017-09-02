import React, { Component } from 'react';
import PropTypes from 'prop-types';
import cl from 'classname';
import ButtonCircle from '_components/ButtonCircle';

import style from './style.styl';

export default class GradientPlayer extends Component {
  render() {
    const {
      image, className, onLike,
      onSkip, onToggleSound, isSound,
    } = this.props;

    return (
      <div className={cl(style.container, className)} >
        <img
          src={image}
          alt="Singer"
          className={style.image}
        />
        <i className={style.grad1} />
        <i className={style.grad2} />
        <i className={style.grad3} />
        <ButtonCircle
          background="#ff3333"
          typeIcon="heart"
          onClick={onLike}
          className={style.like}
        />
        <ButtonCircle
          onClick={onSkip}
          typeIcon="skip"
          className={style.skip}
        />
        <div className={style.sound}>
          { isSound &&
            <ButtonCircle
              onClick={onToggleSound}
              typeIcon="sound"
              background="rgba(0,0,0,0)"
              className={style.soundIn}
            />
          }
          { !isSound &&
            <ButtonCircle
              onClick={onToggleSound}
              typeIcon="sound-off"
              background="rgba(0,0,0,0)"
              className={style.soundOut}
            />
          }
        </div>
      </div>
    );
  }
}

GradientPlayer.propTypes = {
  image: PropTypes.string.isRequired,
  className: PropTypes.string,
  onLike: PropTypes.func,
  onSkip: PropTypes.func,
  onToggleSound: PropTypes.func,
  isSound: PropTypes.bool,
};
