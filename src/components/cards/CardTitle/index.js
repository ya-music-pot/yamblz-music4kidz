import React, { Component } from 'react';
import PropTypes from 'prop-types';
import cl from 'classname';
import style from './style.styl';

export default class CardTitle extends Component {
  renderSplittedTitle(titleParts) {
    return (
      <span>
        {titleParts.map((part, i) => (
          <span key={part}>
            {part}{i !== titleParts.length - 1 && '\u00a0'}
          </span>
        ))}
      </span>
    );
  }

  render() {
    const { styles, text } = this.props;
    const titleParts = text.split('\\u00a0');
    return (
      <h2 className={cl(style.title, styles)}>
        { titleParts.length === 1 ? text : this.renderSplittedTitle(titleParts) }
      </h2>
    );
  }
}

CardTitle.propTypes = {
  styles: PropTypes.string,
  text: PropTypes.string,
};
