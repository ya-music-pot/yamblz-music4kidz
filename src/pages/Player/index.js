import React, { Component } from 'react';
import { connect } from 'react-redux';

class Player extends Component {
  render() {
    return (
      <div>
        Плеер
      </div>
    );
  }
}

export default connect((state, props) => ({
  ...state,
  ...props,
}))(Player);
