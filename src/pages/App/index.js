import React, { Component } from 'react';
import PropTypes from 'prop-types';

import style from './style.scss';

export default class App extends Component {
  render() {
    return (
      <div className={style.container}>
        { this.props.children }
      </div>
    );
  }
}

App.propTypes = {
  children: PropTypes.node.isRequired,
};
