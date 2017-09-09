import React, { Component } from 'react';
import { connect } from 'react-redux';

import PropTypes from 'prop-types';
import modal from '_decorators/modal';

import ListTracks from './ListTracks';
import Player from './Player';

const ModalPlaylist = modal(ListTracks);

class App extends Component {
  render() {
    const { listTracks } = this.props.modal;

    return (
      <div>
        { this.props.children }
        { this.props.isShowPlayer && <Player /> }
        { listTracks && <ModalPlaylist /> }
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
