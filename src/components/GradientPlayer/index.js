import React, { Component } from 'react';
import PropTypes from 'prop-types';
import cl from 'classname';
import ButtonCircle from '_components/ButtonCircle';
import Icon from '_components/Icon';
import style from './style.styl';

export default class GradientPlayer extends Component {
  renderDefaultIcon() {
    return (
      <div className={style.defaultImage}>
        <Icon
          className={style.icon}
          typeIcon="bird"
        />
      </div>
    );
  }

  renderImage() {
    return (
      <img
        src={this.props.image}
        alt="Singer"
        className={style.image}
      />
    );
  }

  renderPlaying() {
    return (
      <div>
        <i className={style.grad1} />
        <i className={style.grad2} />
        <i className={style.grad3} />
      </div>
    );
  }

  renderButtons() {
    const {
      onLike, onSkip, onToggleSound,
      isSound,
    } = this.props;

    return (
      <div>
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

  render() {
    const { className, isPlaying, image } = this.props;

    return (
      <div className={cl(style.container, className)} >
        { image ? this.renderImage() : this.renderDefaultIcon() }
        { isPlaying && this.renderPlaying() }
        { isPlaying && this.renderButtons() }
      </div>
    );
  }
}

GradientPlayer.propTypes = {
  image: PropTypes.string.isRequired,
  isPlaying: PropTypes.bool,
  className: PropTypes.string,
  onLike: PropTypes.func,
  onSkip: PropTypes.func,
  onToggleSound: PropTypes.func,
  isSound: PropTypes.bool,
};
