import React, { Component } from 'react';
import style from './style.scss';

export default class PersonalCard extends Component {
  render() {
    return (
      <div>
        <div>status</div>
        <div>title</div>
        <div>subtitle</div>
        <div>button</div>
      </div>
    );
  }
}

PersonalCard.propTypes = {};
