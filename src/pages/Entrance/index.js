import React, { Component } from 'react';
import { connect } from 'react-redux';

import Example from '_components/Example';

class Entrance extends Component {
  render() {
    return (
      <div>
        Вход
        <Example />
      </div>
    );
  }
}

export default connect((state, props) => ({
  ...state,
  ...props,
}))(Entrance);
