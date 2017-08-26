import React, { Component } from 'react';
import { connect } from 'react-redux';

import EntranceScreen from './screens/EntranceScreen';
import PlaylistCalibration from './screens/PlaylistCalibration';

class Entrance extends Component {
  constructor() {
    super();

    this.state = {
      showEntranceScreen: true
    }
  }

  _handleNavigate = (e) => {
    this.setState({
      showEntranceScreen: false
    });
  }

  _handleCalibrationAccept = (e) => {
    this.props.history.push('/setup');
  }

  _handleCalibrationDeny = (e) => {
    this.props.history.push('/playlist');
  }

  render() {
    return (
      this.state.showEntranceScreen ?
      <EntranceScreen
        onNavigate={this._handleNavigate}
      /> :
      <PlaylistCalibration
        onAccept={this._handleCalibrationAccept}
        onDeny={this._handleCalibrationDeny}
      />
    );
  }
}

export default connect((state, props) => ({
  ...state,
  ...props,
}))(Entrance);
