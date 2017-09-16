import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import cl from 'classname';

import {
  getUser, getAllTracks, getAllPlaylists,
  getAchievements,
} from '_actions/user';
import { playerPlay, setPlaylist, playerPause } from '_actions/player';
import { showPlayer, playerModeUpdate } from '_actions/playerInfo';
import callbacks from '_helpers/cardCallbacks';

import Header from './Header';
import ListSection from './ListSection';
import style from './style.styl';

class Personal extends Component {
  state = {
    activeTab: 'playlists',
  };

  componentWillMount() {
    const { user } = this.props;
    const { id } = user.data;

    this.props.getUser(id);
    this.props.getAllTracks(id);
    this.props.getAllPlaylists(id);
    this.props.getAchievements(id);
  }

  componentDidMount() {
    document.addEventListener('scroll', this._handleScroll);
  }

  componentWillUnmount() {
    document.removeEventListener('scroll', this._handleScroll);
  }

  _handleScroll = () => {
    const scrollTop = Math.max(
      document.documentElement.scrollTop,
      document.body.scrollTop,
    );
    const { stickyHeader, stickyFilter } = this.state;

    if (scrollTop > 0 && !stickyHeader) {
      this.setState({
        stickyHeader: true,
      });
    } else if (scrollTop === 0 && stickyHeader) {
      this.setState({
        stickyHeader: false,
      });
    }

    if (scrollTop > 255 && !stickyFilter) {
      this.setState({
        stickyFilter: true,
      });
    } else if (scrollTop <= 255 && stickyFilter) {
      this.setState({
        stickyFilter: false,
      });
    }
  };

  _handleToggle = (id) => {
    this.setState({
      activeTab: id,
    });
  };

  _handleBack = () => {
    this.props.router.goBack();
  };

  _handleSearch = () => {
    this.props.router.push('/feed');
  };

  _handleTrackClick = (id) => {
    const { isPlaying, trackId } = this.props.player;
    const { tracks } = this.props.user;

    if (id === trackId && isPlaying) {
      this.props.playerPause();
    } else if (isPlaying) {
      this.props.setPlaylist(tracks);
      this.props.playerPlay(id);
    } else {
      this.props.playerModeUpdate('mini');
      this.props.showPlayer(tracks);
      this.props.setPlaylist(tracks);
      this.props.playerPlay(id);
    }
  };

  render() {
    const { user, player, isPlayerVisible } = this.props;

    const { trackId, isPlaying } = player;
    const { tracks, playlists } = user;

    const userAchievements = user.achievements;
    const achievementsDict = this.props.achievements;

    const { firstName, lastName, avatarUrl } = user.data;

    const { activeTab, stickyHeader, stickyFilter } = this.state;
    const cardListData = activeTab === 'playlists' ? playlists : tracks;

    callbacks.onRouterPush = this.props.router.push;

    return (
      <div className={
        cl(style.container, stickyFilter && style.containerSticky,
          isPlayerVisible && style.containerPadded)}
      >
        <Header
          avatar={avatarUrl}
          achievementsDict={achievementsDict}
          onBackClick={this._handleBack}
          sticky={stickyHeader}
          userAchievements={userAchievements}
          userName={`${firstName} ${lastName}`}
        />
        <ListSection
          trackId={trackId}
          isPlaying={isPlaying}
          stickyFilter={stickyFilter}
          activeTab={activeTab}
          cardListData={cardListData}
          callbacks={callbacks}
          onToggle={this._handleToggle}
          onTrackClick={this._handleTrackClick}
          onSearch={this._handleSearch}
        />
      </div>
    );
  }
}

export default connect((state, props) => ({
  user: state.user,
  achievements: state.dictionaries.achievements,
  player: state.player,
  isPlayerVisible: state.playerInfo.isShow,
  ...props,
}), {
  getUser,
  getAllTracks,
  getAllPlaylists,
  getAchievements,
  playerPlay,
  setPlaylist,
  showPlayer,
  playerModeUpdate,
  playerPause,
})(Personal);

Personal.propTypes = {
  achievements: PropTypes.object,
  player: PropTypes.object,
  router: PropTypes.object,
  user: PropTypes.object,
  isPlayerVisible: PropTypes.bool,

  getUser: PropTypes.func,
  getAllTracks: PropTypes.func,
  getAllPlaylists: PropTypes.func,
  getAchievements: PropTypes.func,
  playerPlay: PropTypes.func,
  playerModeUpdate: PropTypes.func,
  playerPause: PropTypes.func,
  setPlaylist: PropTypes.func,
  showPlayer: PropTypes.func,
};
