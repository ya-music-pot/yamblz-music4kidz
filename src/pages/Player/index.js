import React, { Component } from 'react';
import { connect } from 'react-redux';
import Background from '_components/player/Background';
import Container from '_components/player/Container';

import style from './style.scss';

class Player extends Component {
  render() {
    return (
      <div >
        <Container />
        <Background />
      </div>
    );
  }
}

export default connect((state, props) => ({
  ...state,
  ...props,
}))(Player);
