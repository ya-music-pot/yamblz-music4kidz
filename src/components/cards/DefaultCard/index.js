import React, { Component } from 'react';

import PropTypes from 'prop-types';

import CardTitle from '_components/cards/CardTitle';
import CardSubtitle from '_components/cards/CardSubtitle';
import Icon from '_components/Icon';
import Button from '_components/Button';

import style from './style.styl';

export default class DefaultCard extends Component {
  _onClick = () => {
    this.props.callbacks.onRouterPush('/setup');
  };

  render() {
    const {
      container, title, subtitle,
      button, icon, info,
    } = style;

    return (
      <div className={container}>
        <div className={info}>
          <div>
            <Icon className={icon} typeIcon="thumbs-up" />
            <Icon className={icon} typeIcon="action-music" />
          </div>
          <CardTitle text="Музыка только для тебя" styles={title} />
          <CardSubtitle text="Создай своё радио!" styles={subtitle} />
        </div>
        <Button style={button} onClick={this._onClick}>
          Создать
        </Button>
      </div>
    );
  }
}

DefaultCard.propTypes = {
  callbacks: PropTypes.shape({
    onRouterPush: PropTypes.func,
  }),
};
