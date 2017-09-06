import React, { Component } from 'react';

import PropTypes from 'prop-types';
import Player from '_components/Player';

export default class App extends Component {
  render() {
    return (
      <div>
        { this.props.children }
        <Player />
      </div>
    );
  }
}

App.propTypes = {
  children: PropTypes.node.isRequired,
};
