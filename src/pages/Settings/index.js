import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import ButtonNext from '_components/ButtonNext';
import ListLikes from '_components/ListLikes';

import { updateStep } from '_actions/settings';

import Mood from './Mood';
import Action from './Action';

import style from './style.scss';

class Settings extends Component {
  _handleChangeStep = () => {
    const { steps, activeStep } = this.props;
    const newStep = activeStep.step + 1;

    if (steps[newStep]) {
      this.props.updateStep(newStep);
    }
  }

  render() {
    const { activeStep } = this.props;
    const { title, step } = activeStep;

    return (
      <div className={style.container}>
        <ListLikes count={3} className={style.list} />
        <h1 className={style.title}>{title}</h1>
        { step === 1 && <Mood /> }
        { step === 2 && <Action /> }
        <ButtonNext
          onClick={this._handleChangeStep}
          className={style.btn}
        />
      </div>
    );
  }
}

export default connect((state, props) => {
  const { steps, activeStep } = state.settings;

  return {
    steps,
    activeStep: steps[activeStep],
    ...props,
  };
}, { updateStep })(Settings);

Settings.propTypes = {
  steps: PropTypes.object,
  history: PropTypes.object,
  activeStep: PropTypes.object,
};
