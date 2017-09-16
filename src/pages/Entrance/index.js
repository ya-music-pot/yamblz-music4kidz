import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

import callbacks from '_helpers/cardCallbacks';
import { removePlayerPage } from '_helpers/player';

import EntranceScreen from './EntranceScreen';
import style from './style.styl';

const BACKGROUND_COLOR = '#fee05b';

class Entrance extends Component {
  state = {
    showEntranceScreen: true,
  };

  componentWillMount() {
    removePlayerPage();
    this._metaThemeColor = document.querySelector('meta[name=theme-color]');
    this._metaThemeColor.setAttribute('content', BACKGROUND_COLOR);
  }

  _handleNavigate = () => {
    removePlayerPage();
    this.props.router.push('/calibration');
  };

  _handleCalibrationDeny = () => {
    this.props.router.push('/feed');
  };

  render() {
    return (
      <div className={style.container}>
        <EntranceScreen
          onNavigate={this._handleNavigate}
          onDeny={this._handleCalibrationDeny}
          data={this.props.data}
          callbacks={callbacks}
        />
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
