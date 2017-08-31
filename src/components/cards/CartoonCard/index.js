import React, { Component } from 'react';
import PropTypes from 'prop-types';

import CardTitle from '_components/cards/CardTitle';
import CardSubtitle from '_components/cards/CardSubtitle';
import ButtonMiniplayer from '_components/ButtonMiniplayer';

import style from './style.scss';

export default class CartoonCard extends Component {
  render() {
    const { container, content, title: titleStyles,
      subtitle, button
    } = style;

    const { onCardClick, onButtonClick } = this.props;

    const { title, text, imageUrl } = this.props.data;
    const backgroundStyles = {};

    if (imageUrl) {
      backgroundStyles.backgroundImage = `url(${imageUrl})`;
    }

    return (
      <div className={container} onClick={onCardClick} style={backgroundStyles}>
        <div className={content}>
          <CardTitle text={title} styles={titleStyles} />
          <CardSubtitle text={text} styles={subtitle} />
          <ButtonMiniplayer onClick={onButtonClick} position={button} />
        </div>
      </div>
    );
  }
}

CartoonCard.propTypes = {
  data: PropTypes.object,
  onButtonClick: PropTypes.func,
  onCardClick: PropTypes.func,
};
