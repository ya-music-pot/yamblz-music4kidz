import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

import Topbar from '_components/Topbar';
import CardList from '_components/CardList';

import { playerPlay, setPlaylist } from '_actions/player';
import { showPlayer, playerModeUpdate } from '_actions/playerInfo';
import { getFeed } from '_actions/feed';

import style from './style.styl';
import PersonalRadio from './PersonalRadio';

class Feed extends Component {
  componentWillMount() {
    const { userId } = this.props;

    if (userId !== undefined) {
      this.props.getFeed(userId);
    }
  }

  _onButtonClick = (trackId, playlist, isRadio = false) => {
    this.props.playerModeUpdate('mini');
    this.props.showPlayer(playlist, isRadio);
    this.props.setPlaylist(playlist, isRadio);
    this.props.playerPlay(trackId);
  };

  _onCardClick = (trackId, playlist, isRadio = false) => {
    this.props.playerModeUpdate('full');
    this.props.showPlayer(playlist, isRadio);
    this.props.setPlaylist(playlist, isRadio);
    this.props.playerPlay(trackId);
  };

  render() {
    const { playlist, container } = style;
    const { feed, backgroundsList } = this.props;

    const callbacks = {
      onButtonClick: this._onButtonClick,
      onCardClick: this._onCardClick,
    };

    return (
      <div className={playlist}>
        <div className={container}>
          <Topbar />
          <PersonalRadio callbacks={callbacks} />
          <CardList
            feed={feed}
            callbacks={callbacks}
            backgroundsList={backgroundsList}
          />
        </div>
      </div>
    );
  }
}

Feed.propTypes = {
  getFeed: PropTypes.func,
  playerPlay: PropTypes.func,
  setPlaylist: PropTypes.func,
  showPlayer: PropTypes.func,
  playerModeUpdate: PropTypes.func,

  feed: PropTypes.object,
  backgroundsList: PropTypes.object,
  userId: PropTypes.number,
};

export default connect((state, props) => ({
  playerInfo: state.playerInfo,
  player: state.player,
  playlist: state.feed.data,
  feed: state.feed,
  userId: state.user.data.id === undefined ? 1 : state.user.data.id,
  backgroundsList: state.dictionaries.backgroundsList,
  ...props,
}), {
  playerPlay,
  setPlaylist,
  showPlayer,
  playerModeUpdate,
  getFeed,
})(Feed);
