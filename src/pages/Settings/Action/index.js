import React, { Component } from 'react';
import { connect } from 'react-redux';
import { push } from 'react-router-redux';
import PropTypes from 'prop-types';

import CircleAction from '_components/CircleAction';

import Slider from '_decorators/Slider';

import style from './style.scss';

class Action extends Component {
  render() {
    const { listActions } = this.props;

    return (
      <div className={style.container}>
        <Slider className={style.slider}>
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
};


export default connect((state, props) => ({
  listActions: state.dictionaries.listActions,
  ...props,
}), { push })(Action);

