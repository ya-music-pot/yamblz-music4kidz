import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import Button from '_components/Button';
import entrance from '_decorators/Entrance';

import cl from 'classname';

import Icon from '_components/Icon';
import style from './style.styl';

class EntranceCalibration extends Component {
  componentWillMount() {
    if (this.props.userId) {
      this.props.router.push('/feed');
    }
  }

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
  userId: PropTypes.number,
  router: PropTypes.object,
};

export default connect((state, props) => ({
  ...props,
  userId: state.user.data.id,
}))(entrance(EntranceCalibration));
