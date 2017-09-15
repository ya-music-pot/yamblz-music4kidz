import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Button from '_components/Button';
import entrance from '_decorators/Entrance';

import cl from 'classname';

import Icon from '_components/Icon';
import style from './style.styl';

class EntranceCalibration extends Component {
  render() {
    return (
      <div>
        <div className={style.titleContainer}>
          <div className={style.title}>
            Катя, давай создадим лучший в&nbsp;мире плейлист для&nbsp;тебя?
            <Icon typeIcon="entrance-emoji" />
          </div>
        </div>
        <div className={style.buttonWrapper}>
          <Button
            style={cl(style.button)}
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

EntranceCalibration.propTypes = {
  onAccept: PropTypes.func.isRequired,
  onDeny: PropTypes.func.isRequired,
};

export default entrance(EntranceCalibration);
