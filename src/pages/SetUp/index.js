import React, { Component } from 'react';
import { connect } from 'react-redux';

class SetUp extends Component {
  render() {
    return (
      <div>Первоначальная настройка плеера</div>
    );
  }
}

export default connect((state, props) => ({
  ...state,
  ...props,
}))(SetUp);
