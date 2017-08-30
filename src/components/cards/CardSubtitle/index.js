import React, { Component } from 'react';
import PropTypes from 'prop-types';
import cl from 'classname';

import style from './style.scss';

export default class CardSubtitle extends Component {
  render() {
    const { styles } = this.props;
    return (
      <div className={cl(style.subtitle, styles)}>
        {this.props.text}
      </div>
    );
  }
}

CardSubtitle.propTypes = {
  styles: PropTypes.string,
  text: PropTypes.string,
};
