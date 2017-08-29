// TO DO — переименовать в SetUp
import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import ButtonCircle from '_components/ButtonCircle';
import ListLikes from '_components/ListLikes';

import { updateStep } from '_actions/setup';

import Mood from './Mood';
import Action from './Action';
import Player from './Player';

import style from './style.scss';

class Settings extends Component {
  componentWillUnmount() {
    console.log(1111)
    // this.props.clearSettings();
  }

  _handleChangeStep = () => {
    const { steps, activeStep } = this.props;
    const newStep = activeStep.step + 1;

    if (steps[newStep - 1]) {
      this.props.updateStep(newStep);
    }
  }

  _handleSkipStep = () => {
    console.log(1111)
  }

  /**
   * @return {Node}
   */
  render() {
    const { activeStep } = this.props;
    const { title, step } = activeStep;

    return (
      <div className={style.container}>
        <ListLikes count={3} className={style.list} />
        <h1 className={style.title}>{title}</h1>
        { step === 1 && <Player /> }
        { step === 2 && <Mood /> }
        { step === 3 && <Action /> }
        {
          activeStep.type !== 'player' &&
          <ButtonCircle
            onClick={this._handleChangeStep}
            className={style.btn}
            typeIcon="arrow-right"
          />
        }
        {
          activeStep.type === 'player' &&
          <div
            className={style.skipTitle}
            onClick={this._handleSkipStep}
          >
            Пропустить этот шаг
          </div>
        }
      </div>
    );
  }
}

export default connect((state, props) => {
  const { steps, activeStep } = state.setup;
  return {
    steps,
    activeStep: steps[activeStep - 1],
    ...props,
  };
}, { updateStep })(Settings);

Settings.propTypes = {
  steps: PropTypes.array,
  updateStep: PropTypes.func,
  activeStep: PropTypes.object,
};
