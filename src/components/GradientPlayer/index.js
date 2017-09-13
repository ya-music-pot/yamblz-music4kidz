import React, { Component } from 'react';
import PropTypes from 'prop-types';
import cl from 'classname';

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

  render() {
    const { className, isPlaying, image } = this.props;

    return (
      <div className={cl(style.container, className)} >
        { image ? this.renderImage() : this.renderDefaultIcon() }
        { isPlaying && this.renderPlaying() }
      </div>
    );
  }
}

GradientPlayer.propTypes = {
  image: PropTypes.string,
  isPlaying: PropTypes.bool,
  className: PropTypes.string,
};
