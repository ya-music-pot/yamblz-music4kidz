import React, { Component } from 'react';
import PropTypes from 'prop-types';

import CardTitle from '_components/cards/CardTitle';
import Button from '_components/Button';
import Icon from '_components/Icon';

import style from './style.scss';

export default class SingleCard extends Component {
  _openMiniplayer = () => {
    console.log('open miniplayer');
  };

  render() {
    const {
      container,
      content,
      title,
      info,
      singer,
      button,
    } = style;

    const { author, song, imageUrl } = this.props.data;
    const backgroundStyles = {};

    if (imageUrl) {
      backgroundStyles.backgroundImage = `url(${imageUrl})`;
    }

    return (
      <div className={container} style={backgroundStyles}>
        <div className={content}>
          <CardTitle text="Новый трек" styles={title} />
          <div className={info}>
            <Button onClick={this._openMiniplayer} style={button}>
              <Icon typeIcon="play-card" />
            </Button>
            <div>
              <div className={singer}>{author}</div>
              <div>{song}</div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

SingleCard.propTypes = {
  data: PropTypes.object,
};
