import React, { Component } from 'react';
import PropTypes from 'prop-types';
import cl from 'classname';

import style from './style.scss';

export default class newPlayer extends Component {
  render() {
    return (
      <div className={style.wrapper}>
        Hello world!
      </div>
    );
  }
}

newPlayer.propTypes = {

}

// Player.propTypes = {
//   trackName: PropTypes.string,
//   singerName: PropTypes.string,
//   trackPercentage: PropTypes.number,
//   isPlaying: PropTypes.bool,
//   onTogglePlay: PropTypes.func,
//   onDownload: PropTypes.func,
//   className: PropTypes.string,
// };
