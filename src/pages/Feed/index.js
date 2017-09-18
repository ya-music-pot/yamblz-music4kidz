import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import cl from 'classname';
import ReactCSSTransitionGroup from 'react-addons-css-transition-group';

import Topbar from '_components/Topbar';
import CardList from '_components/CardList';

import { getFeed } from '_actions/feed';
import { getRadio } from '_actions/player';
import { getAllPlaylists } from '_actions/user';
import { openModal, closeModal } from '_actions/modal';

import callbacks from '_helpers/cardCallbacks';
import Modal from '_decorators/Modal';

import PersonalRadio from './PersonalRadio';
import Auth from './Auth';
import style from './style.styl';

const ModalAuth = Modal(Auth);

class Feed extends Component {
  componentWillMount() {
    const { id } = this.props.user;

    if (id) {
      this.props.getFeed(id);
      this.props.getRadio(id);
      this.props.getAllPlaylists(id);
    } else {
      this.props.getFeed();
    }
  }

  componentWillReceiveProps(nextProps) {
    const newUserId = nextProps.user.id;
    if (this.props.user.id !== newUserId && newUserId) {
      this.props.getRadio(nextProps.user.id);
    }
  }

  _handleAvatarClick = () => {
    const { id } = this.props.user;
    if (id) {
      this.props.router.push('/personal');
    } else {
      this.props.openModal('authModal', true);
    }
  };

  _handleCreateRadioClick = () => {
    this.props.openModal('authModal', true);
  };

  _handleAuthClick = () => {
    this.props.router.push('/setup');
    this.props.closeModal();
  };

  renderAuthModal() {
    const { authModal } = this.props.modal;
    return (
      <ReactCSSTransitionGroup
        transitionName={{
          enter: style.enter,
          enterActive: style.enterActive,
          leave: style.leave,
          leaveActive: style.leaveActive,
        }}
        transitionEnterTimeout={300}
        transitionLeaveTimeout={300}
      >
        { authModal && <ModalAuth onClick={this._handleAuthClick} /> }
      </ReactCSSTransitionGroup>
    );
  }

  render() {
    const { playlist, container, paddingBottom } = style;
    callbacks.onRouterPush = this.props.router.push;
    callbacks.onCreateClick = this._handleCreateRadioClick;
    const { data } = this.props.feed;
    const { user, isPlayerVisible } = this.props;

    return (
      <div className={cl(playlist, isPlayerVisible && paddingBottom)}>
        <div className={container}>
          <Topbar
            onClick={this._handleAvatarClick}
            user={user}
          />
          <PersonalRadio callbacks={callbacks} />
          <CardList data={data} callbacks={callbacks} />
          { !user.id && this.renderAuthModal() }
        </div>
      </div>
    );
  }
}

Feed.propTypes = {
  router: PropTypes.object,
  openModal: PropTypes.func,
  closeModal: PropTypes.func,
  getFeed: PropTypes.func,
  getRadio: PropTypes.func,
  feed: PropTypes.object,
  user: PropTypes.object,
  getAllPlaylists: PropTypes.func,
  isPlayerVisible: PropTypes.bool,
  modal: PropTypes.shape({
    authModal: PropTypes.object,
  }),
};

export default connect((state, props) => ({
  ...props,
  feed: state.feed,
  user: state.user.data,
  modal: state.modal,
  isPlayerVisible: state.playerInfo.isShow,
}), {
  openModal,
  closeModal,
  getFeed,
  getRadio,
  getAllPlaylists,
})(Feed);
