import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

import ErrorButton from '_components/error/ErrorButton';
import style from './style.styl';

class ClientError extends Component {
  onButtonClick = () => {
    this.props.router.push('/feed');
  };

  render() {
    const {
      container, dog, text,
    } = style;
    return (
      <div className={container}>
        <div className={dog} />
        <div className={text}>Такой страницы нет! Вернуться обратно?</div>
        <ErrorButton onClick={this.onButtonClick} />
      </div>
    );
  }
}

ClientError.propTypes = {
  router: PropTypes.object,
};

export default connect((state, props) => ({
  ...props,
}))(ClientError);
