import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import { getFeed } from '_actions/feed';
import Card from '_decorators/Card';

class CardList extends Component {
  componentWillMount() {
    const { userId } = this.props;

    if (userId !== undefined) {
      this.props.getFeed(userId);
    }
  }

  _getIsPlaying(id) {
    const { playlistId, shouldPlay } = this.props;
    let isPlaying = false;
    if (id === playlistId && shouldPlay) {
      isPlaying = true;
    }
    return isPlaying;
  }

  render() {
    const { feed: { data }, callbacks } = this.props;

    return (
      <div>
        { data && data.map((card) => (<Card
          data={card}
          key={card.id}
          callbacks={callbacks}
          isPlaying={this._getIsPlaying(card.id)}
        />)) }
      </div>
    );
  }
}

export default connect((state, props) => {
  const {
    feed, user: { data },
    player: { playlistId, shouldPlay },
  } = state;
  const userId = data.id === undefined ? 1 : data.id;
  return {
    ...props,
    feed,
    userId,
    playlistId,
    shouldPlay,
  };
}, { getFeed })(CardList);

CardList.propTypes = {
  callbacks: PropTypes.object,
  feed: PropTypes.object,
  userId: PropTypes.number,
  getFeed: PropTypes.func,
  playlistId: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.number,
  ]),
  shouldPlay: PropTypes.bool,
};
