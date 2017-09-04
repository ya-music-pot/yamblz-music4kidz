import React, { Component } from 'react';
import PropTypes from 'prop-types';

import Icon from '_components/Icon';
import style from './style.styl';

export default class EmojiStatus extends Component {
  render() {
    const { container, icon } = style;
    const { settings: { moodIcon, actionIcon } } = this.props;

    return (
      <div className={container}>
        { actionIcon && <Icon typeIcon={actionIcon} className={icon} /> }
        { moodIcon && <Icon typeIcon={moodIcon} className={icon} /> }
      </div>
    );
  }
}

EmojiStatus.propTypes = {
  settings: PropTypes.object,
};
