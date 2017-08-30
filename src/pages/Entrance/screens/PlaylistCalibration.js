import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Button from '_components/Button';
import cl from 'classname';

import style from '../style.scss';

export default class PlaylistCalibration extends Component {
  render() {
    return (
      <div className={style.container}>
        <div className={style.titleContainer}>
          <div className={style.title}>
            А давай создадим лучший в мире плейлист для тебя?
          </div>
        </div>
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
    );
  }
}

PlaylistCalibration.propTypes = {
  onAccept: PropTypes.func.isRequired,
  onDeny: PropTypes.func.isRequired,
};
