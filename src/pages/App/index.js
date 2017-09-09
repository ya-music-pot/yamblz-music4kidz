import React, { Component } from 'react';
import { connect } from 'react-redux';

import PropTypes from 'prop-types';
// import modal from '_decorators/modal';

// import Playlist from './Playlist';
import Player from './Player';

// const ModalPlaylist = modal(Playlist);

class App extends Component {
  render() {
    return (
      <div>
        { this.props.children }
        { this.props.isShowPlayer && <Player /> }
      </div>
    );
  }

  // <ModalPlaylist />
}

App.propTypes = {
  children: PropTypes.node.isRequired,
  isShowPlayer: PropTypes.bool,
};

export default connect((state, props) => ({
  ...props,
  isShowPlayer: state.playerInfo.isShow,
}))(App);
