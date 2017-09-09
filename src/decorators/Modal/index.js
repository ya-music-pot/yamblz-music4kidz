import React, { Component as ReactComponent } from 'react';

import Icon from '_components/Icon';

import style from './style.styl';

export default Component => class Modal extends ReactComponent {

  componentWillMount() {
    document.body.style.overflow = 'hidden';
  }

  componentWillUnmount() {
    document.body.style.overflow = null;
  }

  _onModalClose = () => {}

  render() {
    return (
      <div className={style.container}>
        <div className={style.close} onClick={this._onModalClose}>
          <Icon typeIcon="close" />
        </div>
        <div className={style.content}>
          <Component {...this.props} />
        </div>
      </div>
    );
  }
};
