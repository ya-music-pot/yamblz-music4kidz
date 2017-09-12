import React, { Component } from 'react';
import PropTypes from 'prop-types';
import cl from 'classname';
import style from './style.styl';

export default class CardTitle extends Component {
  renderSplittedTitle(arr) {
    return (<span>
      {arr.map((string, i) => <span key={string}>{string}{i !== arr.length - 1 && '\u00a0'}</span>)}
    </span>
    );
  }

  render() {
    const { styles, text } = this.props;
    const arr = text.split('\\u00a0');
    return (
      <h2 className={cl(style.title, styles)}>
        { arr.length === 1 ? text : this.renderSplittedTitle(arr) }
      </h2>
    );
  }
}

CardTitle.propTypes = {
  styles: PropTypes.string,
  text: PropTypes.string,
};
