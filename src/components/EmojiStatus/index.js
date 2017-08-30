import React, { Component } from 'react';
import PropTypes from 'prop-types';

import Icon from '_components/Icon';
import style from './style.scss';

export default class EmojiStatus extends Component {
  render() {
    const { container, icon } = style;
    const { settings: { activeEmoji, activeAction } } = this.props;

    return (
      <div className={container}>
        <Icon typeIcon={activeAction} className={icon} />
        <Icon typeIcon={activeEmoji} className={icon} />
      </div>
    );
  }
}

EmojiStatus.propTypes = {
  settings: PropTypes.object,
};
