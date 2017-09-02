import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

import CircleAction from '_components/CircleAction';
import Slider from '_decorators/Slider';

import { saveAction } from '_actions/settings';

import style from './style.scss';

class Action extends Component {
  /**
   * _handleChangeAction
   * @param  {Number} newId
   */
  _handleChangeAction = (newId) => {
    const activeAction = this.props.listActions[newId];
    this.props.saveAction(activeAction.typeIcon);
  };

  render() {
    const { listActions } = this.props;

    return (
      <div className={style.container}>
        <Slider
          className={style.slider}
          onChange={this._handleChangeAction}
        >
          {
            listActions.map(({ typeIcon, title }) => (
              <CircleAction
                key={`action${typeIcon}`}
                id={`action${typeIcon}`}
                typeIcon={typeIcon}
                title={title}
              />
            ))
          }
        </Slider>
      </div>
    );
  }
}

Action.propTypes = {
  listActions: PropTypes.array,
  saveAction: PropTypes.func,
};


export default connect((state, props) => ({
  listActions: state.dictionaries.listActions,
  activeAction: state.settings.activeAction,
  ...props,
}), { saveAction })(Action);

