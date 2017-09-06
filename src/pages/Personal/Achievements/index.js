import React, { Component } from 'react';
import style from './style.styl';

export default class Achievements extends Component {
  render() {
    // TODO рендерить массив ачивок
    return (
      <div className={style.achievements}>
        <div className={style.totalScore}>
          {'8 баллов'}
        </div>
      </div>
    );
  }
}

