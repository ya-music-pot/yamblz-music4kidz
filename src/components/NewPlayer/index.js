import React, { Component } from 'react';
import PropTypes from 'prop-types';
import cl from 'classname';
import PlayerToggle from '_decorators/PlayerToggle';
import MiniPlayer from '_components/MiniPlayer';
import Player from '_components/Player';

export default class NewPlayer extends Component {

  render() {
    return (
      <PlayerToggle>
        <MiniPlayer id="1" key="MiniPlayer"/>
        <Player id="2" key="FullPlayer"/>
      </PlayerToggle>
    );
  }
}

NewPlayer.propTypes = {

};
