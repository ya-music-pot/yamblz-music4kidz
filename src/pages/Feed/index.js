import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import cl from 'classname';

import Topbar from '_components/Topbar';
import CardList from '_components/CardList';
import { getFeed } from '_actions/feed';
import { getAllPlaylists } from '_actions/user';
import callbacks from '_helpers/cardCallbacks';

import style from './style.styl';
import PersonalRadio from './PersonalRadio';

class Feed extends Component {
  componentWillMount() {
    const { id } = this.props.user;
    this.props.getFeed(id);
    this.props.getAllPlaylists(id);
  }

  _handleAvatarClick = () => {
    const { id } = this.props.user;
    if (id) {
      this.props.router.push('/personal');
    }
  };

  render() {
    const { playlist, container, paddingBottom } = style;
    callbacks.onRouterPush = this.props.router.push;
    const { data } = this.props.feed;
    const { user, isPlayerVisible } = this.props;

    return (
      <div className={cl(playlist, isPlayerVisible && paddingBottom)}>
        <div className={container}>
          <Topbar
            onClick={this._handleAvatarClick}
            user={user}
          />
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
  user: PropTypes.object,
  getAllPlaylists: PropTypes.func,
  isPlayerVisible: PropTypes.bool,
};

export default connect((state, props) => ({
  ...props,
  feed: state.feed,
  user: state.user.data,
  isPlayerVisible: state.playerInfo.isShow,
}), {
  getFeed,
  getAllPlaylists,
})(Feed);
