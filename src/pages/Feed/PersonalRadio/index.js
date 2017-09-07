import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import PersonalCard from '_components/cards/PersonalCard';
import DefaultCard from '_components/cards/DefaultCard';

class PersonalRadio extends Component {
  getTitle = (emoji, action) => {
    const root = emoji.title.slice(0, -2);
    switch (action.form) {
      case 'feminine':
        return `${root}ая ${action.title}`;
      case 'plural':
        return `${root}ые ${action.title}`;
      case 'neuter':
        return `${root}ое ${action.title}`;
      case 'single':
        return emoji.title;
      default:
        return `${emoji.title} ${action.title}`;
    }
  };

  renderCard = () => {
    const { settings: { actionId, moodId } } = this.props;

    if (!actionId || !moodId) {
      return (
        <DefaultCard callbacks={this.props.callbacks} />
      );
    }

    const {
      callbacks,
      dictionaries: { listEmoji, listActions },
    } = this.props;

    const settings = {
      moodIcon: listEmoji.data[moodId].typeIcon,
      actionIcon: listActions.data[actionId].typeIcon,
      title: this.getTitle(listEmoji.data[moodId], listActions.data[actionId]),
    };

    return (
      <PersonalCard
        settings={settings}
        callbacks={callbacks}
      />
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

  return {
    ...props,
    settings: { moodId, actionId },
    dictionaries: { listEmoji, listActions },
  };
})(PersonalRadio);

PersonalRadio.propTypes = {
  settings: PropTypes.object,
  callbacks: PropTypes.object,
  dictionaries: PropTypes.object,
};
