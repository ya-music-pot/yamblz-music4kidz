import React, { Component } from 'react';
import PropTypes from 'prop-types';
import cl from 'classname';

import styles from './style.styl';

export default class Avatar extends Component {
  render() {
    const { className, avatar, onClick } = this.props;
    const style = {
      backgroundImage: `url(${avatar})`,
    };

    return (
      <div
        className={cl(styles.avatar, className || '')}
        style={avatar && style}
        onClick={onClick}
      />
    );
  }
}

Avatar.propTypes = {
  avatar: PropTypes.string,
  className: PropTypes.string,
  onClick: PropTypes.func,
};
