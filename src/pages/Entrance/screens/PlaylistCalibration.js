import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Button from '_components/Button';
import cl from 'classname';

import style from '../style.styl';

export default class PlaylistCalibration extends Component {
  render() {
    return (
      <div className={cl(style.container, style.containerLeft)}>
        <div className={style.calibrationTitleContainer}>
          <div className={style.title}>
            А давай создадим<br />лучший в мире<br />плейлист для тебя?
          </div>
        </div>
        <div className={style.calibrationButtonWrapper}>
          <Button
            style={cl(style.button, style.buttonLower)}
            onClick={this.props.onAccept}
          >
            Создать
          </Button>
          <Button
            style={style.buttonSmall}
            onClick={this.props.onDeny}
          >
            Не хочу сейчас
          </Button>
        </div>
      </div>
    );
  }
}

PlaylistCalibration.propTypes = {
  onAccept: PropTypes.func.isRequired,
  onDeny: PropTypes.func.isRequired,
};
