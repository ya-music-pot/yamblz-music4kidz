import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

import callbacks from '_helpers/cardCallbacks';

import EntranceScreen from './EntranceScreen';
import PlaylistCalibration from './PlaylistCalibration';
import style from './style.styl';

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
      <div className={style.container}>
        {
          this.state.showEntranceScreen ?
            <EntranceScreen
              onNavigate={this._handleNavigate}
              onDeny={this._handleCalibrationDeny}
              data={this.props.data}
              callbacks={callbacks}
            /> :
            <PlaylistCalibration
              onAccept={this._handleCalibrationAccept}
              onDeny={this._handleCalibrationDeny}
            />
        }
      </div>
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
