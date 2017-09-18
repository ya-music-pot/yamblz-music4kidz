import React, { Component as ReactComponent } from 'react';
import { connect } from 'react-redux';
import cl from 'classname';

import Icon from '_components/Icon';
import { closeModal } from '_actions/modal';

import style from './style.styl';

class Modal extends ReactComponent {
  componentWillMount() {
    document.body.style.overflow = 'hidden';
  }

  componentWillUnmount() {
    document.body.style.overflow = null;
  }

  _onModalClose = () => {
    this.props.closeModal();
  }

  render() {
    const { Component, modal } = this.props;

    return (
      <div className={cl(modal.inPlayer && style.mainContainerPlayer, style.mainContainer)}>
        <i className={style.outside} onClick={this._onModalClose} />
        <div className={style.container}>
          <div className={style.close} onClick={this._onModalClose}>
            <Icon typeIcon="close" />
          </div>
          <div className={style.content}>
            <Component {...this.props} />
          </div>
        </div>
      </div>
    );
  }
}

export default Component => connect((state, props) => ({
  ...props,
  // TODO: Подумать как это вынести из общей обертки.
  modal: state.modal.listTracks || {},
  Component,
}), { closeModal })(Modal);
