import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import ButtonCircle from '_components/ButtonCircle';
import ListSettings from '_components/ListSettings';
import Loader from '_components/Loader';

import { updateStep, clearSetUp } from '_actions/setup';
import { createUser, updateUser } from '_actions/user';
import { playerClear, playerStop } from '_actions/player';
import { removePlayerPage } from '_helpers/player';

import Mood from './Mood';
import Action from './Action';
import Player from './Player';

import style from './style.styl';

class SetUp extends Component {
  componentWillMount() {
    removePlayerPage();
    this._pushToFeed(this.props);
  }

  componentWillReceiveProps(nextProps) {
    this._pushToFeed(nextProps);
  }

  componentWillUnmount() {
    this.props.clearSetUp();
    removePlayerPage();
  }

  _pushToFeed(props) {
    if (props.user.data.id) {
      this.props.router.push('/feed');
    }
  }

  _handleNextStep = () => {
    const { steps, activeStep } = this.props;
    const newStep = activeStep.step + 1;
    const isStep = steps[newStep - 1];

    if (isStep) {
      this.props.updateStep(newStep);
    }

    if (!isStep) {
      this._manageUser();
    }

    if (isStep && activeStep.step === 1) {
      this.props.playerStop();
      this.props.playerClear();
    }
  }

  _manageUser() {
    const { user, settings } = this.props;
    const { moodId, actionId } = settings;

    const id = user.data.id;
    if (id) {
      this.props.updateUser({
        id,
        moodId,
        actionId,
      });

    } else {
      this.props.createUser({ ...settings });
    }
  }

  renderSteps() {
    const {
      activeStep, settings, steps,
      listActions, listEmoji,
    } = this.props;

    const { likesCount, moodId, actionId } = settings;
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
              nameIcon="arrow-right"
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

  render() {
    return this.props.user.loading ? <Loader /> : this.renderSteps();
  }
}

SetUp.propTypes = {
  loading: PropTypes.bool,
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
  user: PropTypes.object,
  settings: PropTypes.shape({
    likesCount: PropTypes.number,
    actionId: PropTypes.number,
    moodId: PropTypes.number,
    tracks: PropTypes.array,
  }),
  updateUser: PropTypes.func,
  createUser: PropTypes.func,
  playerStop: PropTypes.func,
  updateStep: PropTypes.func,
  clearSetUp: PropTypes.func,
  playerClear: PropTypes.func,
  activeStep: PropTypes.shape({
    step: PropTypes.number,
    type: PropTypes.string,
    title: PropTypes.string,
  }),
  router: PropTypes.object,
};

export default connect((state, props) => {
  const { steps, activeStep } = state.setup;
  const { listEmoji, listActions } = state.dictionaries;

  return {
    user: state.user,
    steps,
    settings: state.settings,
    listEmoji,
    listActions,
    activeStep: steps[activeStep - 1],
    ...props,
  };
}, {
  updateStep,
  updateUser,
  clearSetUp,
  createUser,
  playerClear,
  playerStop,
})(SetUp);

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
