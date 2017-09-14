import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

import callbacks from '_helpers/cardCallbacks';
import { removePlayerPage } from '_helpers/player';

import EntranceScreen from './EntranceScreen';
import PlaylistCalibration from './PlaylistCalibration';
import style from './style.styl';

const BACKGROUND_COLOR = '#fee05b';
const DEFAULT_COLOR = '#7859ff';

class Entrance extends Component {
  state = {
    showEntranceScreen: true,
  };

  componentWillMount() {
    removePlayerPage();
    this._metaThemeColor = document.querySelector('meta[name=theme-color]');
    this._metaThemeColor.setAttribute('content', BACKGROUND_COLOR);
  }

  componentWillUnmount() {
    this._metaThemeColor.setAttribute('content', DEFAULT_COLOR);
  }

  _handleNavigate = () => {
    removePlayerPage();
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
