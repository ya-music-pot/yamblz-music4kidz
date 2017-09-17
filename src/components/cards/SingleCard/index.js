import React, { Component } from 'react';
import PropTypes from 'prop-types';

import getRandomInteger from '_helpers/randomNumber';
import CardTitle from '_components/cards/CardTitle';
import CardAdd from '_components/cards/CardAdd';
import ButtonMiniplayer from '_components/ButtonMiniplayer';

import style from './style.styl';

export default class SingleCard extends Component {
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
    const { gradients } = this.props.bgs;
    const gradient = gradients[getRandomInteger(0, gradients.length - 1)];
    return { backgroundImage: `linear-gradient(${gradient})` };
  }

  render() {
    const {
      container, content, title,
      info, singer, button, overlay,
    } = style;

    const {
      data, isPlaying, isLiked, isAuth,
      callbacks: { handleCardClick, handleButtonClick, onAddClick },
    } = this.props;

    const { artist, name } = data.tracks[0];
    const imageUrl = data.image_url;

    const imageStyles = {};
    if (imageUrl) {
      imageStyles.backgroundImage = `url(${imageUrl})`;
    }

    return (
      <div className={container} style={imageStyles} onClick={handleCardClick}>
        <div className={overlay} style={this.state.bg} />
        <div className={content}>
          <CardTitle text="Модный трек" styles={title} />
          <div className={info}>
            <ButtonMiniplayer
              onClick={handleButtonClick}
              position={button}
              type="single"
              isPlaying={isPlaying}
            />
            <div>
              <div className={singer}>{artist}</div>
              <div>{name}</div>
            </div>
          </div>
          { isAuth && <CardAdd
            onAddClick={onAddClick}
            isLiked={isLiked}
            playlist={data}
          /> }
        </div>
      </div>
    );
  }
}

SingleCard.propTypes = {
  data: PropTypes.object,
  callbacks: PropTypes.object,
  bgs: PropTypes.object,
  isPlaying: PropTypes.bool,
  isLiked: PropTypes.bool,
  isAuth: PropTypes.bool,
};
