import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Button from '_components/Button';

import style from './style.scss';

export default class Container extends Component {

  handleClick(e) {
    console.log(e);
  }

  render() {
    return (
      <div className={style.wrapper}>
        <Button style={style.buttonLike} onClick={() => console.log(2)}/>
        <Button style={style.buttonDislike} onClick={() => console.log(2)} label="Button 2"/>
        <Button style={style.buttonImg} onClick={() => console.log(3)} label="Button 2"/>
      </div>
    );
  }
}

Container.propTypes = {};
