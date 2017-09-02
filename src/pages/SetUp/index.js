import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import ButtonCircle from '_components/ButtonCircle';
import ListSettings from '_components/ListSettings';

import { updateStep, clearSetUp } from '_actions/setup';

import Mood from './Mood';
import Action from './Action';
import Player from './Player';

import style from './style.styl';

class SetUp extends Component {
  componentWillUnmount() {
    this.props.clearSetUp();
  }

  _handleNextStep = () => {
    const { steps, activeStep } = this.props;
    const newStep = activeStep.step + 1;

    if (steps[newStep - 1]) {
      this.props.updateStep(newStep);
    } else {
      this.props.router.push('/playlist');
    }
  }

  render() {
    const {
      activeStep, likesCount, actionId,
      moodId, steps, listActions,
      listEmoji,
    } = this.props;
    const { title, step } = activeStep;

    const stepEmoji = getStepByType(steps, 'emoji');
    const stepActive = getStepByType(steps, 'action');

    return (
      <div className={style.container}>
        <div className={style.content}>
          <ListSettings
            count={likesCount}
            className={style.list}
            moodIcon={activeStep.step > stepEmoji && listEmoji.data[moodId].typeIcon}
            actionIcon={activeStep.step > stepActive && listActions.data[actionId].typeIcon}
          />

          <h1 className={style.title}>{title}</h1>
          { step === 1 && <Player onNextStep={this._handleNextStep} /> }
          { step === 2 && <Mood /> }
          { step === 3 && <Action /> }
        </div>
        <div className={style.footer}>
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
      </div>
    );
  }
}

SetUp.propTypes = {
  router: PropTypes.object.isRequired,
  steps: PropTypes.arrayOf(
    PropTypes.shape({
      step: PropTypes.number,
      type: PropTypes.string,
      title: PropTypes.string,
    }),
  ),
  listActions: PropTypes.shape({
    order: PropTypes.array,
    data: PropTypes.object,
  }),
  listEmoji: PropTypes.shape({
    order: PropTypes.array,
    data: PropTypes.object,
  }),
  updateStep: PropTypes.func,
  clearSetUp: PropTypes.func,
  likesCount: PropTypes.number,
  actionId: PropTypes.number,
  moodId: PropTypes.number,
  activeStep: PropTypes.shape({
    step: PropTypes.number,
    type: PropTypes.string,
    title: PropTypes.string,
  }),
};

export default connect((state, props) => {
  const { steps, activeStep } = state.setup;
  const { likesCount, actionId, moodId } = state.settings;
  const { listEmoji, listActions } = state.dictionaries;
  return {
    steps,
    likesCount,
    moodId,
    actionId,
    listEmoji,
    listActions,
    activeStep: steps[activeStep - 1],
    ...props,
  };
}, { updateStep, clearSetUp })(SetUp);

/**
 * Helpers
 */

/**
 * getStepByType
 * @param  {Object[]} steps
 * @param  {Number} steps[].step
 * @param  {String} steps[].type
 * @param  {String} emoji
 * @return {Number}
 */
function getStepByType(steps, emoji) {
  const findStep = steps.find((item) => item.type === emoji);
  return findStep && findStep.step;
}
