import React, { Component } from 'react';

import Header from './Header';
import style from './style.styl';

export default class Personal extends Component {
  render() {
    return (
      <div className={style.container}>
        <Header
          avatar="https://images.fineartamerica.com/images/artworkimages/mediumlarge/1/american-outlaw-v-clint-eastwood-iconic-images-art-gallery-david-pucciarelli.jpg"
          userName="Иван Анциферов"
        />
      </div>
    );
  }
}

