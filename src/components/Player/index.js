import React, { Component } from 'react';
import PlayerToggle from '_decorators/PlayerToggle';
import MiniPlayer from '_components/MiniPlayer';
import FullPlayer from '_components/FullPlayer';

export default class Player extends Component {
  render() {
    const playerState = this.props;
    return (
      <PlayerToggle>
        <MiniPlayer playerState={playerState} key="mini" />
        <FullPlayer playerState={playerState} key="full" />
      </PlayerToggle>
    );
  }
}

Player.defaultProps = {
  playerState: {
    trackName: 'Название песни',
    singerName: 'Название исполнителя',
    trackPercentage: 0.63,
    minutesLeft: '1',
    secondsLeft: '23',
    isPlaying: false,
    cover: '',
  },
};
