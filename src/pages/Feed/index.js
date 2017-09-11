import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

import Topbar from '_components/Topbar';
import CardList from '_components/CardList';
import { getFeed, likePlaylist, dislikePlaylist } from '_actions/feed';
import { getAllPlaylists } from '_actions/user';
import callbacks from '_helpers/cardCallbacks';

import style from './style.styl';
import PersonalRadio from './PersonalRadio';

class Feed extends Component {
  componentWillMount() {
    const { userId } = this.props;
    this.props.getFeed(userId);
    this.props.getAllPlaylists(userId);
  }

  _handleAddClick = (isLiked, playlistId) => {
    const { userId } = this.props;
    if (isLiked) {
      this.props.dislikePlaylist(userId, playlistId);
    } else {
      this.props.likePlaylist(userId, playlistId);
    }
  };

  render() {
    const { playlist, container } = style;
    callbacks.onRouterPush = this.props.router.push;
    callbacks.onAddClick = this._handleAddClick;
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
  getFeed: PropTypes.func,
  feed: PropTypes.object,
  userId: PropTypes.number,
  likePlaylist: PropTypes.func,
  dislikePlaylist: PropTypes.func,
  getAllPlaylists: PropTypes.func,
};

export default connect((state, props) => ({
  ...props,
  feed: state.feed,
  userId: state.user.data.id,
}), { getFeed, likePlaylist, dislikePlaylist, getAllPlaylists })(Feed);
