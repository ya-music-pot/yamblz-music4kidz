import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

import GradientPlayer from '_components/GradientPlayer';

import { saveLikesCount } from '_actions/settings';

import person from './images/artist.jpg';
import style from './style.styl';

class Player extends Component {
  state = {
    countChoose: 0,
    isSound: true,
  }

  _handleLike = () => {
    this.props.saveLikesCount(this.props.likesCount + 1);
    this._handleUpdateChoose();
  }

  _handleSkip = () => {
    this._handleUpdateChoose();
  }

  _handleToggleSound = () => {
    this.setState({ isSound: !this.state.isSound });
  }

  _handleUpdateChoose() {
    const countChoose = this.state.countChoose + 1;
    if (countChoose >= 3) {
      this.props.onNextStep();
      return;
    }
    this.setState({ countChoose });
  }

  render() {
    const isSound = this.state.isSound;

    return (
      <div className={style.container}>
        <div className={style.wrapperPlayer}>
          <div className={style.player}>
            <GradientPlayer
              image={person}
              onLike={this._handleLike}
              onSkip={this._handleSkip}
              onToggleSound={this._handleToggleSound}
              isSound={isSound}
            />
          </div>
          <h3 className={style.title}>Егор Крид</h3>
        </div>
      </div>
    );
  }
}

Player.propTypes = {
  saveLikesCount: PropTypes.func,
  onNextStep: PropTypes.func,
  likesCount: PropTypes.number,
};

export default connect((state, props) => ({
  likesCount: state.settings.likesCount,
  listEmoji: state.dictionaries.listEmoji,
  ...props,
}), { saveLikesCount })(Player);
