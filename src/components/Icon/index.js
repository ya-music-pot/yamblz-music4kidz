import React, { Component } from 'react';
import PropTypes from 'prop-types';
import cl from 'classname';

import style from './style.scss';

export default class Icon extends Component {
  _onClick = () => {
    this.props.onClick(this.props.typeIcon);
  }

  render() {
    const { typeIcon } = this.props;
    return (
      <span
        onClick={this._onClick}
        className={cl(style.icon, style[typeIcon])}
      />
    );
  }
}

Icon.propTypes = {
  typeIcon: PropTypes.string.isRequired,
  onClick: PropTypes.func,
};
