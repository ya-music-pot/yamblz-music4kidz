import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

import style from './style.scss';

class Player extends Component {
  render() {
    return (
      <div className={style.container}>
        12321
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
