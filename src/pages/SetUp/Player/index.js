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
  }

  _handleLike = () => {
    this.props.saveLikesCount(this.props.likesCount + 1);
    this._handleUpdateChoose();
  }

  _handleSkip = () => {
    this._handleUpdateChoose();
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
              <ButtonCircle
                onClick={this._handleChangeStep}
                typeIcon="sound"
                background="rgba(0,0,0,0)"
                className={style.soundIn}
              />
              {
                /*
                  <ButtonCircle
                  onClick={this._handleChangeStep}
                  typeIcon="sound-off"
                  background="rgba(0,0,0,0)"
                  className={style.soundOut}
                  />
                */
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
  activeType: PropTypes.string,
  saveLikesCount: PropTypes.func,
  onNextStep: PropTypes.func,
  likesCount: PropTypes.number,
};

export default connect((state, props) => ({
  likesCount: state.settings.likesCount,
  activeType: state.settings.activeEmoji,
  listEmoji: state.dictionaries.listEmoji,
  ...props,
}), { saveLikesCount })(Player);
