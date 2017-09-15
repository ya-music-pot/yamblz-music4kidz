import React, { Component as ReactComponent } from 'react';

import callbacks from '_helpers/cardCallbacks';

import style from './style.styl';

export default (Component) => class Entrance extends ReactComponent {
  _handleNavigate = () => {
    this.props.router.push('/calibration');
  }

  _handleCalibrationDeny = () => {
    this.props.router.push('/feed');
  }

  _handleCalibrationAccept = () => {
    this.props.router.push('/setup');
  }

  render() {
    return (
      <div className={style.container}>
        <Component
          onNavigate={this._handleNavigate}
          onAccept={this._handleCalibrationAccept}
          onDeny={this._handleCalibrationDeny}
          callbacks={callbacks}
          {...this.props}
        />
      </div>
    );
  }
};
