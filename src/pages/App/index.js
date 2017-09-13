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
        { this.props.isModePlayer && <Player /> }
        { this.renderListTracks() }
      </div>
    );
  }
}

App.propTypes = {
  children: PropTypes.node.isRequired,
  isModePlayer: PropTypes.string,
  modal: PropTypes.shape({
    listTracks: PropTypes.object,
  }),
};

export default connect((state, props) => ({
  ...props,
  modal: state.modal,
  isModePlayer: state.playerInfo.mode,
}))(App);
