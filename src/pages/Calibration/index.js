import React, { Component } from 'react';
import { connect } from 'react-redux';

import PropTypes from 'prop-types';
import Button from '_components/Button';
import cl from 'classname';

import Icon from '_components/Icon';
import style from './style.styl';

const DEFAULT_COLOR = '#7859ff';

class PlaylistCalibration extends Component {
  componentWillMount() {
    if (this.props.userData.id) {
      this.props.router.push('/feed');
    }
  }

  componentWillUnmount() {
    this._metaThemeColor = document.querySelector('meta[name=theme-color]');
    this._metaThemeColor.setAttribute('content', DEFAULT_COLOR);
  }

  _handleCalibrationAccept = () => {
    this.props.router.push('/setup');
  };

  _handleCalibrationDeny = () => {
    this.props.router.push('/feed');
  };

  render() {
    return (
      <div className={style.container}>
        <div className={style.titleContainer}>
          <div className={style.title}>
            Катя, давай создадим лучшее в&nbsp;мире радио для&nbsp;тебя?
            <Icon typeIcon="entrance-emoji" />
          </div>
        </div>
        <div className={style.buttonWrapper}>
          <Button
            style={cl(style.button)}
            onClick={this._handleCalibrationAccept}
          >
            Создать
          </Button>
          <Button
            style={style.buttonSmall}
            onClick={this._handleCalibrationDeny}
          >
            Не хочу сейчас
          </Button>
        </div>
      </div>
    );
  }
}

PlaylistCalibration.propTypes = {
  router: PropTypes.object,
  userData: PropTypes.shape({
    id: PropTypes.number,
  }),
};

export default connect((state, props) => {
  const { data } = state.user;
  return {
    ...props,
    userData: data,
  };
})(PlaylistCalibration);
