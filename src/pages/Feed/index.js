import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

import Topbar from '_components/Topbar';
import PersonalCard from '_components/cards/PersonalCard';

import style from './style.styl';
import CardList from './CardList';

class Feed extends Component {
  _onButtonClick = () => {
    console.log('I click on button!');
  };

  _onCardClick = () => {
    this.props.router.push('/player');
  };

  render() {
    const { playlist, container } = style;

    const { settings } = this.props;

    const callbacks = {
      onButtonClick: this._onButtonClick,
      onCardClick: this._onCardClick,
    };

    return (
      <div className={playlist}>
        <div className={container}>
          <Topbar />
          <PersonalCard
            settings={settings}
            callbacks={callbacks}
          />
          <CardList callbacks={callbacks} />
        </div>
      </div>
    );
  }
}

export default connect((state, props) => {
  const { moodId, actionId } = state.user.data;
  const { listEmoji, listActions } = state.dictionaries;

  return {
    ...props,
    settings: {
      moodIcon: moodId && listEmoji.data[moodId].typeIcon,
      actionIcon: actionId && listActions.data[actionId].typeIcon,
    },
  };
})(Feed);

Feed.propTypes = {
  settings: PropTypes.object,
  router: PropTypes.object,
};
