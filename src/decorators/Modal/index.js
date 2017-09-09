import React, { Component as ReactComponent } from 'react';
import { connect } from 'react-redux';
import onClickOutside from 'react-onclickoutside';

import Icon from '_components/Icon';
import { closeModal } from '_actions/modal';

import style from './style.styl';

class Modal extends ReactComponent {
  handleClickOutside() {
    this.props.closeModal();
  }

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
    const Component = this.props.Component;

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
}

export default Component => connect((state, props) => ({
  ...props,
  Component,
}), { closeModal })(onClickOutside(Modal));
