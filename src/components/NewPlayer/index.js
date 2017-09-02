import React, { Component } from 'react';
import PropTypes from 'prop-types';
import cl from 'classname';
import PlayerToggle from '_decorators/PlayerToggle';

import style from './style.scss';

export default class NewPlayer extends Component {

  render() {
    const { wrapper, leftWrapper, rightWrapper } = style;
    console.log("render");

    return (
      <div className={wrapper}>
        <PlayerToggle>
          <div id="1">miniPlayer</div>
          <div id="2">bigPlayer</div>
        </PlayerToggle>
      </div>
    );
  }
}

NewPlayer.propTypes = {

};

// Player.propTypes = {
//   trackName: PropTypes.string,
//   singerName: PropTypes.string,
//   trackPercentage: PropTypes.number,
//   isPlaying: PropTypes.bool,
//   onTogglePlay: PropTypes.func,
//   onDownload: PropTypes.func,
//   className: PropTypes.string,
// };
