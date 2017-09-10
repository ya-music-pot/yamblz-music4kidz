import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import cl from 'classname';

import { getUser, getAllTracks, getAllPlaylists } from '_actions/user';
import { playerPlay, setPlaylist, playerPause } from '_actions/player';
import { showPlayer, playerModeUpdate } from '_actions/playerInfo';

import Header from './Header';
import ListSection from './ListSection';
import style from './style.styl';

class Personal extends Component {
  state = {
    acviveTab: 'playlists',
  }

  componentWillMount() {
    const { user } = this.props;
    const { id } = user.data;

    this.props.getUser(id);
    this.props.getAllTracks(id);
    this.props.getAllPlaylists(id);
  }

  componentDidMount() {
    document.addEventListener('scroll', this._handleScroll);
  }

  componentWillUnmount() {
    document.removeEventListener('scroll', this._handleScroll);
  }

  _handleScroll = () => {
    const scrollTop = document.body.scrollTop;
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
  }

  _handleToggle = (id) => {
    this.setState({
      acviveTab: id,
    });
  }

  _handleBack = () => {
    this.props.router.goBack();
  }

  _handleSearch = () => {
    this.props.router.push('/feed');
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
  }

  _onCardClick = (params) => {
    const { trackId, playlist, isRadio, playlistId } = params;
    this.props.playerModeUpdate('full');
    this.props.showPlayer(playlist, isRadio);
    this.props.setPlaylist(playlist, isRadio, playlistId);
    this.props.playerPlay(trackId);
  }

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
  }

  render() {
    const { achievements, user, player } = this.props;

    const { trackId, isPlaying } = player;
    const { tracks, playlists } = user;
    const { firstName, lastName, avatarUrl } = user.data;

    const { order, data } = achievements;
    const { acviveTab, stickyHeader, stickyFilter } = this.state;

    const cardListData = acviveTab === 'playlists' ? playlists : tracks;

    const callbacks = {
      onRouterPush: this.props.router.push,
      onButtonClick: this._onButtonClick,
      onCardClick: this._onCardClick,
    };

    return (
      <div className={cl(style.container, stickyFilter && style.containerSticky)}>
        <Header
          avatar={avatarUrl}
          userName={`${firstName} ${lastName}`}
          order={order}
          data={data}
          onBackClick={this._handleBack}
          sticky={stickyHeader}
        />
        <ListSection
          trackId={trackId}
          isPlaying={isPlaying}
          stickyFilter={stickyFilter}
          acviveTab={acviveTab}
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
  ...props,
}), {
  getUser,
  getAllTracks,
  getAllPlaylists,
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

  getUser: PropTypes.func,
  getAllTracks: PropTypes.func,
  getAllPlaylists: PropTypes.func,
  playerPlay: PropTypes.func,
  playerModeUpdate: PropTypes.func,
  playerPause: PropTypes.func,
  setPlaylist: PropTypes.func,
  showPlayer: PropTypes.func,
};
