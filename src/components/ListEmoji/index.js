import React, { Component } from 'react';
import PropTypes from 'prop-types';
import cl from 'classname';

import Icon from '_components/Icon';
import style from './style.scss';

export default class ListEmoji extends Component {
  render() {
    const { data, onChange } = this.props;
    return (
      <ul className={style.list}>
        { data.map(({ typeIcon, isActive }) => (
          <li
            key={typeIcon}
            className={cl(style.item, isActive && style.itemActive)}
          >
            <Icon typeIcon={typeIcon} onClick={onChange} />
          </li>
        ))}
      </ul>
    );
  }
}

ListEmoji.propTypes = {
  data: PropTypes.arrayOf(
    PropTypes.shape({
      typeIcon: PropTypes.string.isRequired,
    }),
  ).isRequired,
  onChange: PropTypes.func,
};
