import React, { Component } from 'react';
import PropTypes from 'prop-types';
import cl from 'classname';

import Icon from '_components/Icon';
import style from './style.styl';

export default class CardTitle extends Component {
  _handleAddClick = (e) => {
    e.stopPropagation();
    const { isLiked, playlist } = this.props;
    this.props.onAddClick(isLiked, playlist);
  };

  render() {
    const { styles, isLiked } = this.props;
    return (
      <div
        className={cl(
          styles,
          style.addCard,
          isLiked && style.isLiked)}
        onClick={this._handleAddClick}
      >
        { isLiked ? <Icon typeIcon="check" /> : <Icon typeIcon="plus" /> }
      </div>
    );
  }
}

CardTitle.propTypes = {
  styles: PropTypes.string,
  isLiked: PropTypes.bool,
  onAddClick: PropTypes.func,
  playlist: PropTypes.object,
};
