import React, { Component } from 'react';
import { connect } from 'react-redux';

import Example from '_components/Example';

class Entrance extends Component {
  _onClick = (e) => {
    console.log(1111)
  }

  render() {
    return (
      <div>
        Вход
        <Example onClick={this._onClick} />
      </div>
    );
  }
}

export default connect((state, props) => ({
  ...state,
  ...props,
}))(Entrance);
