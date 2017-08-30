import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

import GradientPerson from '_components/GradientPerson';
import ButtonCircle from '_components/ButtonCircle';

import { saveLikesCount } from '_actions/settings';

import person from './images/artist.jpg';
import style from './style.scss';

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
            <GradientPerson image={person} />
            <ButtonCircle
              background="#ff3333"
              typeIcon="heart"
              onClick={this._handleLike}
              className={style.like}
            />
            <ButtonCircle
              onClick={this._handleSkip}
              typeIcon="skip"
              className={style.skip}
            />
            <div className={style.sound}>
              { isSound &&
                <ButtonCircle
                  onClick={this._handleToggleSound}
                  typeIcon="sound"
                  background="rgba(0,0,0,0)"
                  className={style.soundIn}
                />
              }
              { !isSound &&
                <ButtonCircle
                  onClick={this._handleToggleSound}
                  typeIcon="sound-off"
                  background="rgba(0,0,0,0)"
                  className={style.soundOut}
                />
              }
            </div>
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
