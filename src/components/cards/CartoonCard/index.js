import React, { Component } from 'react';
import PropTypes from 'prop-types';

import CardTitle from '_components/cards/CardTitle';
import CardSubtitle from '_components/cards/CardSubtitle';
import CardAdd from '_components/cards/CardAdd';
import ButtonMiniplayer from '_components/ButtonMiniplayer';

import style from './style.styl';

export default class CartoonCard extends Component {
  render() {
    const {
      container, content, title,
      subtitle, button,
    } = style;

    const {
      callbacks: { handleCardClick, handleButtonClick, onAddClick },
      isPlaying, isLiked, isAuth, data,
    } = this.props;
    const { name, description, image_url: imageUrl } = data;

    const backgroundStyles = {};
    if (imageUrl) {
      backgroundStyles.backgroundImage = `url(${imageUrl})`;
    }

    return (
      <div className={container} onClick={handleCardClick} style={backgroundStyles}>
        <div className={content}>
          <CardTitle text={name} styles={title} />
          <CardSubtitle text={description} styles={subtitle} />
          <ButtonMiniplayer
            onClick={handleButtonClick}
            position={button}
            isPlaying={isPlaying}
          />
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

CartoonCard.propTypes = {
  data: PropTypes.object,
  callbacks: PropTypes.object,
  isPlaying: PropTypes.bool,
  isLiked: PropTypes.bool,
  isAuth: PropTypes.bool,
};
