import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

import style from './style.styl';

class ServerError extends Component {
  onButtonClick = () => {
    this.props.router.push('/feed');
  };

  render() {
    const {
      container, cat, text,
    } = style;
    return (
      <div className={container}>
        <div className={cat} />
        <div className={text}>Опаньки! Что-то не&nbsp;так… Уже чиним!</div>
      </div>
    );
  }
}

ServerError.propTypes = {
  router: PropTypes.object,
};

export default connect((state, props) => ({
  ...props,
}))(ServerError);
