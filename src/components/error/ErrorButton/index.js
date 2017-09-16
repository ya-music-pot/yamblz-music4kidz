import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Button from '_components/Button';
import style from './style.styl';

export default class ErrorButton extends Component {
  render() {
    return (
      <Button
        onClick={this.props.onClick}
        style={style.button}
      >
        К подборкам
      </Button>
    );
  }
}

ErrorButton.propTypes = {
  onClick: PropTypes.func.isRequired,
};
