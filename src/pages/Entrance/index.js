import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

import EntranceScreen from './screens/EntranceScreen';
import PlaylistCalibration from './screens/PlaylistCalibration';

class Entrance extends Component {
  state = {
    showEntranceScreen: true,
  }

  _handleNavigate = () => {
    this.setState({
      showEntranceScreen: false,
    });
  }

  _handleCalibrationAccept = () => {
    this.props.router.push('/setup');
  }

  _handleCalibrationDeny = () => {
    this.props.router.push('/playlist');
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
  ...props,
}))(Entrance);

Entrance.propTypes = {
  router: PropTypes.object,
};
