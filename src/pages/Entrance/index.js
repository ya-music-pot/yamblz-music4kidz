import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

import callbacks from '_helpers/cardCallbacks';

import EntranceScreen from './screens/EntranceScreen';
import PlaylistCalibration from './screens/PlaylistCalibration';

class Entrance extends Component {
  state = {
    showEntranceScreen: true,
  };

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

  render() {
    return (
      this.state.showEntranceScreen ?
        <EntranceScreen
          onNavigate={this._handleNavigate}
          data={this.props.data}
          callbacks={callbacks}
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
  data: PropTypes.object,
};

export default connect((state, props) => {
  const { data } = state.promo;
  return {
    ...props,
    data,
  };
})(Entrance);
