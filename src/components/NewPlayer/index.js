import React, { Component } from 'react';
import PropTypes from 'prop-types';
import cl from 'classname';
import Slider from '_decorators/Slider';

import style from './style.scss';

export default class NewPlayer extends Component {

  _onChange = () => {
    console.log('I am swipe!');
  };

  render() {
    const { wrapper, leftWrapper, rightWrapper } = style;

    return (
      <div className={wrapper}>
        <Slider onChange={this._onChange}>
          <div className={leftWrapper}>miniPlayer</div>
          <div className={rightWrapper}>bigPlayer</div>
        </Slider>
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
