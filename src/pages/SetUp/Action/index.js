import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

import CircleAction from '_components/CircleAction';
import Slider from '_decorators/Slider';

import { saveAction } from '_actions/settings';

import style from './style.styl';

class Action extends Component {
  /**
   * _handleChangeAction
   * @param  {Number} newId
   */
  _handleChangeAction = (newId) => {
<<<<<<< HEAD
    const activeAction = this.props.listActions[newId];
    this.props.saveAction(activeAction.typeIcon);
  };
=======
    const actionId = this.props.listActions.order[newId];
    this.props.saveAction(actionId);
  }

  renderSlideItem(item) {
    const { title, typeIcon } = item;
    return (
      <CircleAction
        key={`action${typeIcon}`}
        id={`action${typeIcon}`}
        typeIcon={typeIcon}
        title={title}
      />
    );
  }
>>>>>>> bdf1d97220931de80333caf956256228d5a23eff

  render() {
    const { order, data } = this.props.listActions;

    return (
      <div className={style.container}>
        <Slider
          className={style.slider}
          onChange={this._handleChangeAction}
        >
          { order.map((key) => this.renderSlideItem(data[key]))}
        </Slider>
      </div>
    );
  }
}

Action.propTypes = {
  listActions: PropTypes.shape({
    order: PropTypes.array,
    data: PropTypes.object,
  }),
  saveAction: PropTypes.func,
};


export default connect((state, props) => ({
  listActions: state.dictionaries.listActions,
  ...props,
}), { saveAction })(Action);

