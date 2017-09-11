import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

import Topbar from '_components/Topbar';
import CardList from '_components/CardList';
import { getFeed } from '_actions/feed';
import callbacks from '_helpers/cardCallbacks';

import style from './style.styl';
import PersonalRadio from './PersonalRadio';

class Feed extends Component {
  componentWillMount() {
    const { userId } = this.props;
    this.props.getFeed(userId);
  }

  render() {
    const { playlist, container } = style;
    callbacks.onRouterPush = this.props.router.push;
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
};

export default connect((state, props) => ({
  ...props,
  feed: state.feed,
  userId: state.user.data.id,
}), { getFeed })(Feed);
