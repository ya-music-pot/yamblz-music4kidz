import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import cl from 'classname';

import {
  getUser, getAllTracks, getAllPlaylists,
  getAchievements,
} from '_actions/user';

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
    const scrollTop = document.documentElement.scrollTop;
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

  render() {
    const { user, player } = this.props;

    const { trackId, isPlaying } = player;
    const { tracks, playlists } = user;

    const userAchievements = user.achievements;
    const achievementsDict = this.props.achievements;

    const { firstName, lastName, avatarUrl } = user.data;

    const { activeTab, stickyHeader, stickyFilter } = this.state;
    const cardListData = activeTab === 'playlists' ? playlists : tracks;

    return (
      <div className={cl(style.container, stickyFilter && style.containerSticky)}>
        <Header
          avatar={avatarUrl}
          achievementsDict={achievementsDict}
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
          onToggle={this._handleToggle}
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
  getAchievements,
})(Personal);

Personal.propTypes = {
  achievements: PropTypes.object,
  player: PropTypes.object,
  user: PropTypes.object,
  getUser: PropTypes.func,
  getAllTracks: PropTypes.func,
  getAllPlaylists: PropTypes.func,
  getAchievements: PropTypes.func,
};
