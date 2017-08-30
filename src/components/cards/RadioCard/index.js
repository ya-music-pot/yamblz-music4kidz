import React, { Component } from 'react';
import PropTypes from 'prop-types';

import CardTitle from '_components/cards/CardTitle';
import CardSubtitle from '_components/cards/CardSubtitle';
import ButtonMiniplayer from '_components/ButtonMiniplayer';


import style from './style.scss';

export default class RadioCard extends Component {
  _openMiniplayer = () => {
    console.log('open miniplayer');
  };

  render() {
    const { container, title: titleStyles, subtitle, image, button } = style;

    const { title, imageUrl } = this.props.data;
    const backgroundStyles = {};

    if (imageUrl) {
      backgroundStyles.backgroundImage = `url(${imageUrl})`;
    }
    return (
      <div className={container}>
        <CardTitle text={title} styles={titleStyles} />
        <CardSubtitle text="Радио исполнителя" styles={subtitle} />
        <div className={image} style={backgroundStyles}>photo</div>
        <ButtonMiniplayer onClick={this._openMiniplayer} position={button} />
      </div>
    );
  }
}

RadioCard.propTypes = {
  data: PropTypes.object,
};
