import React, { Component } from 'react';
import { connect } from 'react-redux';

import PropTypes from 'prop-types';
import Player from './Player';

class App extends Component {
  render() {
    return (
      <div>
        { this.props.children }
        { this.props.isShowPlayer && <Player /> }
      </div>
    );
  }
}

App.propTypes = {
  children: PropTypes.node.isRequired,
  isShowPlayer: PropTypes.bool,
};

export default connect((state, props) => ({
  ...props,
  isShowPlayer: state.playerInfo.isShow,
}))(App);
