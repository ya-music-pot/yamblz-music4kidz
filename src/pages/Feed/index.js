import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

import Topbar from '_components/Topbar';
import PersonalCard from '_components/cards/PersonalCard';

import { playerStart, setPlaylistId } from '_actions/player';

import style from './style.styl';
import CardList from './CardList';

class Feed extends Component {
  _onButtonClick = () => {
    console.log('I click on button!');
  };

  _onCardClick = (trackId, playlistId) => {
    this.props.setPlaylistId(playlistId);
    this.props.playerStart(trackId);

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

export default connect((state, props) => ({
  settings: state.settings,
  ...props,
}), { playerStart, setPlaylistId })(Feed);

Feed.propTypes = {
  settings: PropTypes.object,
  router: PropTypes.object,
  playerStart: PropTypes.func,
  setPlaylistId: PropTypes.func,
};
