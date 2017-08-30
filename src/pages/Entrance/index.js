import React, { Component } from 'react';
import { connect } from 'react-redux';

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
    this.props.router.push('/playlist');
  };

  _handleOpenPlayer = () => {
    this.props.router.push('/player');
  };

  render() {
    return (
      this.state.showEntranceScreen ?
        <EntranceScreen
          onNavigate={this._handleNavigate}
          data={data}
          onButtonClick={this._handleOpenPlayer}
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

// TODO данные должны приходить из store
const data = {
  title: 'Тачки 3',
  text: '16 песен из мультика',
  imageUrl: '',
};
