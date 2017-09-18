import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

import callbacks from '_helpers/cardCallbacks';
import { removePlayerPage } from '_helpers/player';
import { setUserInfo } from '_actions/user';

import EntranceScreen from './EntranceScreen';
import style from './style.styl';

const BACKGROUND_COLOR = '#fee05b';

class Entrance extends Component {
  state = {
    showEntranceScreen: true,
  };

  componentWillMount() {
    removePlayerPage();
    const { userData, router } = this.props;

    if (userData.id) {
      router.push('/feed');
    }

    this._metaThemeColor = document.querySelector('meta[name=theme-color]');
    this._metaThemeColor.setAttribute('content', BACKGROUND_COLOR);
  }

  _handleNavigate = () => {
    removePlayerPage();

    VK.Auth.login((data) => {
      if (data && data.session && data.status === 'connected') {
        const user = data.session.user;
        const userInfo = {
          login: user.id,
          firstName: user.first_name,
          lastName: user.last_name,
        };

        this.props.setUserInfo(userInfo);
        this.props.router.push('/calibration');
      }
    });
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
  userData: PropTypes.shape({
    id: PropTypes.number,
  }),
  setUserInfo: PropTypes.func,
};

export default connect((state, props) => {
  const { data } = state.promo;
  return {
    ...props,
    data,
    userData: state.user.data,
  };
}, { setUserInfo })(Entrance);
