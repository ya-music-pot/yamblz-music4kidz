import React, { Component } from 'react';
import PropTypes from 'prop-types';

import CardTitle from '_components/cards/CardTitle';
import CardSubtitle from '_components/cards/CardSubtitle';
import ButtonMiniplayer from '_components/ButtonMiniplayer';

import style from './style.scss';

export default class CartoonCard extends Component {
  _openMiniplayer = () => {
    console.log('open miniplayer');
  };

  render() {
    const { container, content, title: titleStyles, subtitle, button } = style;

    const { title, text, imageUrl } = this.props.data;
    const backgroundStyles = {};

    if (imageUrl) {
      backgroundStyles.backgroundImage = `url(${imageUrl})`;
    }

    return (
      <div className={container} style={backgroundStyles}>
        <div className={content}>
          <CardTitle text={title} styles={titleStyles} />
          <CardSubtitle text={text} styles={subtitle} />
          <ButtonMiniplayer onClick={this._openMiniplayer} position={button} />
        </div>
      </div>
    );
  }
}

CartoonCard.propTypes = {
  data: PropTypes.object,
};
