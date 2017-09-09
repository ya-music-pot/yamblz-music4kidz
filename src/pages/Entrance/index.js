import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

import { playerPlay, setPlaylist, playerPause } from '_actions/player';
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

  _handleOpenPlayer = (params) => {
    const { trackId, playlist, isRadio, playlistId } = params;
    this.props.playerModeUpdate('full');
    this.props.showPlayer(playlist, isRadio);
    this.props.setPlaylist(playlist, isRadio, playlistId);
    this.props.playerPlay(trackId);
  };

  _handlePlayPromo = (params) => {
    const { trackId, playlist, isRadio, playlistId, isPlaying } = params;
    if (isPlaying) {
      this.props.playerPause();
    } else {
      this.props.playerModeUpdate('mini');
      this.props.showPlayer(playlist, isRadio);
      this.props.setPlaylist(playlist, isRadio, playlistId);
      this.props.playerPlay(trackId);
    }
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

Entrance.propTypes = {
  router: PropTypes.object,
  playerModeUpdate: PropTypes.func,
  showPlayer: PropTypes.func,
  setPlaylist: PropTypes.func,
  playerPlay: PropTypes.func,
  getPromo: PropTypes.func,
  data: PropTypes.object,
  playerPause: PropTypes.func,
};

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
  playerPause,
})(Entrance);
