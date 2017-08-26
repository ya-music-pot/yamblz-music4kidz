import React, { Component } from 'react';
import { connect } from 'react-redux';

class Mood extends Component {
  render() {
    return (
      <div>
        Настроение
      </div>
    );
  }
}

export default connect((state, props) => ({
  ...state,
  ...props,
}))(Mood);
