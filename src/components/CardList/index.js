import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import Card from '_decorators/Card';

class CardList extends Component {
  _getIsPlaying(id) {
    const { playlistId, shouldPlay } = this.props;
    let isPlaying = false;
    if (id === playlistId && shouldPlay) {
      isPlaying = true;
    }
    return isPlaying;
  }

  render() {
    const { data, callbacks } = this.props;

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
    player: { playlistId, shouldPlay },
  } = state;

  return {
    ...props,
    playlistId,
    shouldPlay,
  };
})(CardList);

CardList.propTypes = {
  callbacks: PropTypes.object,
  data: PropTypes.arrayOf(PropTypes.object),
  playlistId: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.number,
  ]),
  shouldPlay: PropTypes.bool,
};
