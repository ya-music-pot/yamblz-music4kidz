import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Button from '_components/Button';
import cl from 'classname';

import Icon from '_components/Icon';
import style from './style.styl';

const DEFAULT_COLOR = '#7859ff';

export default class PlaylistCalibration extends Component {
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
            Катя, давай создадим лучший в&nbsp;мире плейлист для&nbsp;тебя?
            <Icon typeIcon="entrance-emoji" />
          </div>
        </div>
        <div className={style.buttonWrapper}>
          <Button
            style={cl(style.button)}
            onClick={this._handleCalibrationDeny}
          >
            Создать
          </Button>
          <Button
            style={style.buttonSmall}
            onClick={this._handleCalibrationAccept}
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
};
