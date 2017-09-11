import React, { Component } from 'react';
import PropTypes from 'prop-types';
import cl from 'classname';

import getRandomInteger from '_helpers/randomNumber';
import CardTitle from '_components/cards/CardTitle';
import CardSubtitle from '_components/cards/CardSubtitle';
import ButtonMiniplayer from '_components/ButtonMiniplayer';

import style from './style.styl';

export default class RadioCard extends Component {
  state = {
    bg: this._getBg(),
  };

  componentWillMount() {
    this.timerID = setInterval(
      () => {
        if (this.props.isPlaying) {
          this.setState({
            bg: this._getBg(),
          });
        }
      }, 400,
    );
  }

  componentWillUnmount() {
    clearInterval(this.timerID);
  }

  _getBg() {
    const { colors } = this.props.bgs;
    const color = colors[getRandomInteger(0, colors.length - 1)];
    return { backgroundColor: `#${color}` };
  }

  render() {
    const {
      container, title, circle,
      subtitle, image, button,
      circleL, circleM, circleS,
      imageContainer,
    } = style;

    const {
      data: { name, image_url: imageUrl },
      callbacks: { handleCardClick, handleButtonClick },
      isPlaying,
    } = this.props;

    const imageStyles = {};
    if (imageUrl) {
      imageStyles.backgroundImage = `url(${imageUrl})`;
    }

    return (
      <div style={this.state.bg} className={container} onClick={handleCardClick}>
        <CardTitle text={name} styles={title} />
        <CardSubtitle text="Радио исполнителя" styles={subtitle} />
        <div className={imageContainer}>
          <div className={cl(circle, circleL)} />
          <div className={cl(circle, circleM)} />
          <div className={cl(circle, circleS)} />
          <div className={image} style={imageStyles} />
        </div>
        <ButtonMiniplayer
          onClick={handleButtonClick}
          position={button}
          isPlaying={isPlaying}
        />
      </div>
    );
  }
}

RadioCard.propTypes = {
  data: PropTypes.object,
  callbacks: PropTypes.object,
  bgs: PropTypes.object,
  isPlaying: PropTypes.bool,
};
