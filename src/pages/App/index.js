import React, { Component } from 'react';
import PropTypes from 'prop-types';

import style from './style.scss';
import YaPlayer from '_settings/YaPlayer';

export default class App extends Component {
  state = {
    yaPlayer: null,
  };

  componentDidMount() {
    const yaPlayer = new YaPlayer();
    yaPlayer.loadPlayerScript(
        () => {
          this.setState({ yaPlayer });
        }
    );
  }

  getChildContext() {
    return { yaPlayer: this.state.yaPlayer };
  }

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

App.childContextTypes = {
  yaPlayer: PropTypes.object,
};
