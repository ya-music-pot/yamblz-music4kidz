import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

import { playerPlay, setPlaylist } from '_actions/player';
import { showPlayer, playerModeUpdate } from '_actions/playerInfo';
import { getPromo } from '_actions/promo';

import EntranceScreen from './screens/EntranceScreen';
import PlaylistCalibration from './screens/PlaylistCalibration';

class Entrance extends Component {
  state = {
    showEntranceScreen: true,
  };

  componentWillMount() {
    this.props.getPromo();
  }

  _handleNavigate = () => {
    this.setState({
      showEntranceScreen: false,
    });
  };

  _handleCalibrationAccept = () => {
    this.props.router.push('/setup');
  };

  _handleCalibrationDeny = () => {
    this.props.router.push('/feed');
  };

  _handleOpenPlayer = (trackId, playlist, isRadio = false) => {
    this.props.playerModeUpdate('full');
    this.props.showPlayer(playlist, isRadio);
    this.props.setPlaylist(playlist, isRadio);
    this.props.playerPlay(trackId);
  };

  _handlePlayPromo = (trackId, playlist, isRadio = false) => {
    this.props.playerModeUpdate('mini');
    this.props.showPlayer(playlist, isRadio);
    this.props.setPlaylist(playlist, isRadio);
    this.props.playerPlay(trackId);
  };

  render() {
    const { data } = this.props;

    return (
      this.state.showEntranceScreen ?
        <EntranceScreen
          onNavigate={this._handleNavigate}
          data={data}
          callbacks={{
            onCardClick: this._handleOpenPlayer,
            onButtonClick: this._handlePlayPromo,
          }}
        /> :
        <PlaylistCalibration
          onAccept={this._handleCalibrationAccept}
          onDeny={this._handleCalibrationDeny}
        />
    );
  }
}

export default connect((state, props) => {
  const { data } = state.promo;

  return {
    ...props,
    data,
  };
}, {
  playerModeUpdate,
  showPlayer,
  setPlaylist,
  playerPlay,
  getPromo,
})(Entrance);

Entrance.propTypes = {
  router: PropTypes.object,
  playerModeUpdate: PropTypes.func,
  showPlayer: PropTypes.func,
  setPlaylist: PropTypes.func,
  playerPlay: PropTypes.func,
  getPromo: PropTypes.func,
  data: PropTypes.object,
};
