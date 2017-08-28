import React, { Component } from 'react';
import PropTypes from 'prop-types';

import YaPlayer from '_helpers/YaPlayer';
import style from './style.scss';

export default class App extends Component {
  state = {
    yaPlayer: null,
  };

  getChildContext() {
    return { yaPlayer: this.state.yaPlayer };
  }

  componentDidMount() {
    const yaPlayer = new YaPlayer();
    yaPlayer.loadPlayerScript(
      () => {
        this.setState({ yaPlayer });
      },
    );
  }

  render() {
    return (
      <div>
        { this.props.children }
      </div>
    );
  }
}

App.propTypes = {
  children: PropTypes.node.isRequired,
};

App.childContextTypes = {
  yaPlayer: PropTypes.object,
};
