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
          label="Создать"
          onClick={this.props.onAccept}
        />
        <Button
          style={style.buttonSmall}
          label="Не хочу сейчас"
          onClick={this.props.onDeny}
        />
      </div>
    );
  }
}

PlaylistCalibration.propTypes = {
  onAccept: PropTypes.func.isRequired,
  onDeny: PropTypes.func.isRequired,
};
