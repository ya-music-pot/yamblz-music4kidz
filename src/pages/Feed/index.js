import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

import Topbar from '_components/Topbar';

import { playerPlay, setPlaylist } from '_actions/player';

import style from './style.styl';
import CardList from './CardList';
import PersonalRadio from './PersonalRadio';

class Feed extends Component {
  _onButtonClick = () => {
    console.log('I click on button!');
  };

  _onCardClick = (trackId, playlist, isRadio = false) => {
    this.props.setPlaylist(playlist, isRadio);
    this.props.playerPlay(trackId);
  };

  render() {
    const { playlist, container } = style;

    const callbacks = {
      onButtonClick: this._onButtonClick,
      onCardClick: this._onCardClick,
    };

    return (
      <div className={playlist}>
        <div className={container}>
          <Topbar />
          <PersonalRadio callbacks={callbacks} />
          <CardList callbacks={callbacks} />
        </div>
      </div>
    );
  }
}

Feed.propTypes = {
  playerPlay: PropTypes.func,
  setPlaylist: PropTypes.func,
};

export default connect((state, props) => ({
  playerInfo: state.playerInfo,
  player: state.player,
  playlist: state.feed.data,
  ...props,
}), {
  playerPlay,
  setPlaylist,
})(Feed);
