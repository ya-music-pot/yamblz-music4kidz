import React, { Component } from 'react';
import PropTypes from 'prop-types';

import CardTitle from '_components/cards/CardTitle';
import ButtonMiniplayer from '_components/ButtonMiniplayer';

import style from './style.scss';

export default class CollectionCard extends Component {
  render() {
    const { container, title: titleStyles, content, button } = style;

    const { onCardClick, onButtonClick } = this.props;

    const { title, imageUrl } = this.props.data;
    const backgroundStyles = {};

    if (imageUrl) {
      backgroundStyles.backgroundImage = `url(${imageUrl})`;
    }

    return (
      <div className={container} style={backgroundStyles} onClick={onCardClick}>
        <div className={content}>
          <CardTitle text={title} styles={titleStyles} />
          <ButtonMiniplayer onClick={onButtonClick} position={button} />
        </div>
      </div>
    );
  }
}

CollectionCard.propTypes = {
  data: PropTypes.object,
  onButtonClick: PropTypes.func,
  onCardClick: PropTypes.func,
};
