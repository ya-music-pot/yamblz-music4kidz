import React, { Component } from 'react';
import { connect } from 'react-redux';

class Entrance extends Component {
  render() {
    return (
      <div>
        Вход
      </div>
    );
  }
}

export default connect((state, props) => ({
  ...state,
  ...props,
}))(Entrance);
