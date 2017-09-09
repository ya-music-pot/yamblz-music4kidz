import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

import Topbar from '_components/Topbar';
import CardList from '_components/CardList';

import { playerPlay, setPlaylist, playerPause } from '_actions/player';
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

  _onButtonClick = (params) => {
    const { trackId, playlist, isRadio, playlistId, isPlaying } = params;
    if (isPlaying) {
      this.props.playerPause();
    } else {
      this.props.playerModeUpdate('mini');
      this.props.showPlayer(playlist, isRadio);
      this.props.setPlaylist(playlist, isRadio, playlistId);
      this.props.playerPlay(trackId);
    }
  };

  _onCardClick = (params) => {
    const { trackId, playlist, isRadio, playlistId } = params;
    this.props.playerModeUpdate('full');
    this.props.showPlayer(playlist, isRadio);
    this.props.setPlaylist(playlist, isRadio, playlistId);
    this.props.playerPlay(trackId);
  };

  render() {
    const { playlist, container } = style;
    const callbacks = {
      onRouterPush: this.props.router.push,
      onButtonClick: this._onButtonClick,
      onCardClick: this._onCardClick,
    };
    const { data } = this.props.feed;

    return (
      <div className={playlist}>
        <div className={container}>
          <Topbar />
          <PersonalRadio callbacks={callbacks} />
          <CardList data={data} callbacks={callbacks} />
        </div>
      </div>
    );
  }
}

Feed.propTypes = {
  router: PropTypes.object,
  playerPlay: PropTypes.func,
  setPlaylist: PropTypes.func,
  showPlayer: PropTypes.func,
  playerModeUpdate: PropTypes.func,
  playerPause: PropTypes.func,
  userId: PropTypes.number,
  getFeed: PropTypes.func,
  feed: PropTypes.object,
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
  playerPause,
  getFeed,
})(Feed);
