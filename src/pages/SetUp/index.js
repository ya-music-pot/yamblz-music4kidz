// TO DO — переименовать в SetUp
import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import ButtonCircle from '_components/ButtonCircle';
import ListSettings from '_components/ListSettings';

import { updateStep } from '_actions/setup';

import Mood from './Mood';
import Action from './Action';
import Player from './Player';

import style from './style.scss';

class Settings extends Component {
  componentWillUnmount() {
    // this.props.clearSettings();
  }

  _handleNextStep = () => {
    const { steps, activeStep } = this.props;
    const newStep = activeStep.step + 1;

    if (steps[newStep - 1]) {
      this.props.updateStep(newStep);
    }
  }

  /**
   * @return {Node}
   */
  render() {
    const {
      activeStep, likesCount, activeAction,
      activeEmoji,
    } = this.props;
    const { title, step } = activeStep;

    return (
      <div className={style.container}>
        <ListSettings
          count={likesCount}
          className={style.list}
        />
        <h1 className={style.title}>{title}</h1>
        { step === 1 && <Player onNextStep={this._handleNextStep} /> }
        { step === 2 && <Mood /> }
        { step === 3 && <Action /> }
        {
          activeStep.type !== 'player' &&
          <ButtonCircle
            onClick={this._handleNextStep}
            className={style.btn}
            typeIcon="arrow-right"
          />
        }
        {
          activeStep.type === 'player' &&
          <div
            className={style.skipTitle}
            onClick={this._handleNextStep}
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
  const { likesCount, activeAction, activeEmoji } = state.settings;

  return {
    steps,
    likesCount,
    activeAction,
    activeEmoji,
    activeStep: steps[activeStep - 1],
    ...props,
  };
}, { updateStep })(Settings);

Settings.propTypes = {
  steps: PropTypes.array,
  updateStep: PropTypes.func,
  likesCount: PropTypes.number,
  activeAction: PropTypes.string,
  activeEmoji: PropTypes.string,
  activeStep: PropTypes.object,
};
