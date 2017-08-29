import React, { Component } from 'react';
import PropTypes from 'prop-types';

import Button from '_components/Button';

import style from './style.scss';

export default class CardButton extends Component {
  render() {
    const { label, onClick } = this.props;

    return (
      <div>
        {/*<Button onClick={onClick} label={label} style={style.button} />*/}
      </div>
    );
  }
}

CardButton.propTypes = {
  onClick: PropTypes.func.isRequired,
  label: PropTypes.string,
};
