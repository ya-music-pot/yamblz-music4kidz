import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

import GradientPerson from '_components/GradientPerson';
import ButtonCircle from '_components/ButtonCircle';

import person from './images/artist.jpg';
import style from './style.scss';

class Player extends Component {
  render() {
    return (
      <div className={style.container}>
        <div className={style.wrapperPlayer}>
          <div className={style.player}>
            <GradientPerson image={person} />
            <ButtonCircle
              onClick={this._handleChangeStep}
              background="#ff3333"
              typeIcon="heart"
              className={style.like}
            />
            <ButtonCircle
              onClick={this._handleChangeStep}
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
};


export default connect((state, props) => ({
  activeType: state.settings.activeEmoji,
  listEmoji: state.dictionaries.listEmoji,
  ...props,
}))(Player);
