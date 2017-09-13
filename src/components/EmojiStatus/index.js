import React, { Component } from 'react';
import PropTypes from 'prop-types';
import cl from 'classname';

import Icon from '_components/Icon';
import style from './style.styl';

export default class EmojiStatus extends Component {
  render() {
    const { container, icon } = style;
    const {
      settings: { moodIcon, actionIcon },
      styles,
    } = this.props;

    return (
      <div className={cl(container, styles)}>
        { moodIcon && <Icon typeIcon={moodIcon} className={icon} /> }
        { actionIcon && <Icon typeIcon={actionIcon} className={icon} /> }
      </div>
    );
  }
}

EmojiStatus.propTypes = {
  settings: PropTypes.object,
  styles: PropTypes.string,
};
