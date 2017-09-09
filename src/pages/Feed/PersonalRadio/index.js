import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import CARDS from '_data/cardsType';
import getTitle from '_helpers/getPersonalTitle';
import Card from '_decorators/Card';
import DefaultCard from '_components/cards/DefaultCard';

class PersonalRadio extends Component {
  renderCard = () => {
    const {
      settings: { actionId, moodId },
      callbacks,
    } = this.props;

    if (!actionId || !moodId) {
      return (
        <DefaultCard callbacks={callbacks} />
      );
    }

    const { listEmoji, listActions } = this.props.dictionaries;
    const settings = {
      moodIcon: listEmoji.data[moodId].typeIcon,
      actionIcon: listActions.data[actionId].typeIcon,
      title: getTitle(listEmoji.data[moodId], listActions.data[actionId]),
      type: CARDS.personal,
      id: 'radio',
    };
    const { playlistId, shouldPlay } = this.props;
    let isPlaying = false;
    if (playlistId === 'radio' && shouldPlay) {
      isPlaying = true;
    }

    return (
      <div>
        <Card
          data={settings}
          callbacks={callbacks}
          isPlaying={isPlaying}
        />
      </div>
    );
  };

  render() {
    return (
      <div>
        { this.renderCard() }
      </div>
    );
  }
}

export default connect((state, props) => {
  const { moodId, actionId } = state.user.data;
  const { listEmoji, listActions } = state.dictionaries;
  const { radio, playlistId, shouldPlay } = state.player;
  return {
    ...props,
    settings: { moodId, actionId },
    dictionaries: { listEmoji, listActions },
    radio,
    playlistId,
    shouldPlay,
  };
})(PersonalRadio);

PersonalRadio.propTypes = {
  settings: PropTypes.object,
  callbacks: PropTypes.object,
  dictionaries: PropTypes.object,
  playlistId: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.number,
  ]),
  shouldPlay: PropTypes.bool,
};
