import React, { Component } from 'react';
import PropTypes from 'prop-types';

import CardTitle from '_components/cards/CardTitle';
import ButtonMiniplayer from '_components/ButtonMiniplayer';

import style from './style.scss';

export default class CollectionCard extends Component {
  _openMiniplayer = () => {
    console.log('open miniplayer');
  };

  render() {
    const { container, title: titleStyles, content, button } = style;

    const { title, imageUrl } = this.props.data;
    const backgroundStyles = {};

    if (imageUrl) {
      backgroundStyles.backgroundImage = `url(${imageUrl})`;
    }

    return (
      <div className={container} style={backgroundStyles}>
        <div className={content}>
          <CardTitle text={title} styles={titleStyles} />
          <ButtonMiniplayer onClick={this._openMiniplayer} position={button} />
        </div>
      </div>
    );
  }
}

CollectionCard.propTypes = {
  data: PropTypes.object,
};
