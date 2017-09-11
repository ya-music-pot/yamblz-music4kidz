import React, { Component } from 'react';
import PropTypes from 'prop-types';

import getRandomInteger from '_helpers/randomNumber';
import CardTitle from '_components/cards/CardTitle';
import CardAdd from '_components/cards/CardAdd';
import ButtonMiniplayer from '_components/ButtonMiniplayer';

import style from './style.styl';

export default class CollectionCard extends Component {
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
      container, title,
      content, button, image,
    } = style;

    const {
      data: { name, image_url: imageUrl, id },
      callbacks: { handleCardClick, handleButtonClick, onAddClick },
      isPlaying, isLiked,
    } = this.props;


    const imageStyles = {};
    if (imageUrl) {
      imageStyles.backgroundImage = `url(${imageUrl})`;
    }

    return (
      <div className={container} onClick={handleCardClick} style={this.state.bg}>
        <div className={content}>
          <CardTitle text={name} styles={title} />
          <ButtonMiniplayer
            onClick={handleButtonClick}
            position={button}
            isPlaying={isPlaying}
          />
          <CardAdd onAddClick={onAddClick} isLiked={isLiked} playlistId={id} />
        </div>
        <div className={image} style={imageStyles}>image</div>
      </div>
    );
  }
}

CollectionCard.propTypes = {
  data: PropTypes.object,
  callbacks: PropTypes.object,
  bgs: PropTypes.object,
  isPlaying: PropTypes.bool,
  isLiked: PropTypes.bool,
};
