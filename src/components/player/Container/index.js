import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Button from '_components/Button';
import CircularAvatar from '_components/CircularAvatar';

import style from './style.scss';
import artist from './images/egorka.png';

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

  _handleClickDislike= (e) => {
    console.log("Dislike");
  }

  _handleClickLike = (e) => {
    console.log("Like");
  }

  _handleClickPlus= (e) => {
    console.log("Plus");
  }

  _handleClickRepeat = (e) => {
    console.log("Repeat");
  }

  render() {
    return (
      <div className = {style.wrapper}>
        <div className = {style.headerRow}>
          <Button style = {style.buttonArrowDown} onClick = {this._handleClickArrowDown} />
          <div className = {style.moodIcons} />
          <Button style = {style.buttonDownload} onClick = {this._handleClickDownload} />
        </div>
        <div>
          <div className = {style.vote}>
              <Button style = {style.buttonDislike} onClick = {this._handleClickDislike} />
              <div className = {style.spacer} />
              <Button style = {style.buttonLike} onClick = {this._handleClickLike} />
          </div>
          <CircularAvatar
              image = {artist}
              progress = {0.68}
              radius = {0.18}
              time = {-2.58}
          />
        </div>
        <div className = {style.titleRow}>
           <div className = {style.songName}>
              Будильник
           </div>
           <div className = {style.artistName}>
              Егор Крид
           </div>
        </div>
        <div className = {style.controlsRow}>
          <Button style = {style.buttonPrevious} onClick = {this._handleClickPrevious} />
          <Button style = {style.buttonPlay} onClick = {this._handleClickPlay} />
          <Button style = {style.buttonNext} onClick = {this._handleClickNext} />
        </div>
        <div className = {style.bottomRow}>
          <Button style = {style.buttonPlus} onClick = {this._handleClickPlus} />
          <Button style = {style.buttonRepeat} onClick = {this._handleClickRepeat} />
        </div>
      </div>
    );
  }
}

Container.propTypes = {};
