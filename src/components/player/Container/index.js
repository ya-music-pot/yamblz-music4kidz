import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Button from '_components/Button';
import CircularAvatar from '_components/CircularAvatar';

import style from './style.scss';
import artist from './assets/egorka.png';

export default class Container extends Component {
  _handleClickArrowDown = (e) => {
    console.log("ArrowDown");
  }

  _handleClickDownload = (e) => {
    console.log("Download");
  }

  _handleClickPrevious = (e) => {
    console.log("Previous");
  }

  _handleClickPlay= (e) => {
    console.log("Play");
  }

  _handleClickNext = (e) => {
    console.log("Next");
  }

  render() {
    return (
      <div className={style.wrapper}>
        <div className={style.headerRow}>
          <Button style={style.buttonArrowDown} onClick={this._handleClickArrowDown} />
          <div className={style.moodIcons}></div>
          <Button style={style.buttonDownload} onClick={this._handleClickDownload} />
        </div>
        <CircularAvatar
            image={artist}
            progress={0.68}
        />
        <div className={style.titleRow}>
           <div className={style.songName}>
              Будильник
           </div>
           <div className={style.artistName}>
              Егор Крид
           </div>
        </div>
        <div className={style.controlsRow}>
          <Button style={style.buttonPrevious} onClick={this._handleClickPrevious} />
          <Button style={style.buttonPlay} onClick={this._handleClickPlay} />
          <Button style={style.buttonNext} onClick={this._handleClickNext} />
        </div>
        <div className={style.bottomRow}>
        </div>
      </div>
    );
  }
}

Container.propTypes = {};
