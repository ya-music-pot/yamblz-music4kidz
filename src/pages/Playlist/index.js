import React, { Component } from 'react';
import { connect } from 'react-redux';

class Playlist extends Component {
  render() {
    return (
      <div>
        Плейлист
      </div>
    );
  }
}

export default connect((state, props) => ({
  ...state,
  ...props,
}))(Playlist);
