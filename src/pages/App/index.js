import React, { Component } from 'react';
import { connect } from 'react-redux';
import ReactCSSTransitionGroup from 'react-addons-css-transition-group';

import PropTypes from 'prop-types';
import Modal from '_decorators/Modal';

import ListTracks from './ListTracks';
import Player from './Player';

import style from './style.styl';

const ModalPlaylist = Modal(ListTracks);

class App extends Component {
  renderListTracks() {
    const { listTracks } = this.props.modal;

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
        { listTracks && <ModalPlaylist /> }
      </ReactCSSTransitionGroup>
    );
  }

  render() {
    return (
      <div>
        { this.props.children }
        { this.props.isShowPlayer && <Player /> }
        { this.renderListTracks() }
      </div>
    );
  }
}

App.propTypes = {
  children: PropTypes.node.isRequired,
  isShowPlayer: PropTypes.bool,
  modal: PropTypes.shape({
    listTracks: PropTypes.bool,
  }),
};

export default connect((state, props) => ({
  ...props,
  modal: state.modal,
  isShowPlayer: state.playerInfo.isShow,
}))(App);
