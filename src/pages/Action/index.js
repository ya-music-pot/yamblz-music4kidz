import React, { Component } from 'react';
import { connect } from 'react-redux';

class Action extends Component {
  render() {
    return (
      <div>
        Выберите занятие.
      </div>
    );
  }
}

export default connect((state, props) => ({
  ...state,
  ...props,
}))(Action);
