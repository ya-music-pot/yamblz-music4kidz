import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

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

  _handleOpenPlayer = () => {
    this.props.router.push('/player');
  };

  render() {
    return (
      this.state.showEntranceScreen ?
        <EntranceScreen
          onNavigate={this._handleNavigate}
          data={data}
          callbacks={{
            onCardClick: this._handleOpenPlayer,
            onButtonClick: this._handleOpenPlayer,
          }}
          onButtonClick={this._handleOpenPlayer}
          onCardClick={this._handleOpenPlayer}
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

// TODO данные должны приходить из store
const data = {
  name: 'Тачки 3',
  description: '16 песен из мультика',
  image_url: 'https://dl.dropboxusercontent.com/s/m0t3ehvokmcdhdd/%D1%81ars.png?dl=0',
};

