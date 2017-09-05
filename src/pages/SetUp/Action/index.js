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
    const actionId = this.props.listActions.order[newId];
    this.props.saveAction(actionId);
  }

  renderSlideItem(item) {
    const { title, typeIcon } = item;
    const titleCap = title[0].toUpperCase() + title.slice(1);
    return (
      <CircleAction
        key={`action${typeIcon}`}
        id={`action${typeIcon}`}
        typeIcon={typeIcon}
        title={titleCap}
      />
    );
  }

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

