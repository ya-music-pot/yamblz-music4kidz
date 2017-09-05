import React, { Component } from 'react';

import style from './style.styl';

export default class Loader extends Component {
  render() {
    return (
      <div className={style.container}>
        <div className={style.spinner}>
          <div className={style.bounce1} />
          <div className={style.bounce2} />
        </div>
      </div>
    );
  }
}

Loader.propTypes = {
};
