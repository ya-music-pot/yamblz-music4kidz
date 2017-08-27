import React, { Component } from 'react';
import PropTypes from 'prop-types';
import cl from 'classname';

import Icon from '_components/Icon';
import style from './style.scss';

export default class ListActions extends Component {
  render() {
    const { data, onChange, className } = this.props;
    return (
      <ul className={cl(style.list, className)}>
        { data.map(({ typeIcon, isActive }) => (
          <li
            key={typeIcon}
            className={cl(style.item, isActive && style.itemActive)}
          >
            <Icon
              typeIcon={typeIcon}
              onClick={onChange}
              className={style.icon}
            />
          </li>
        ))}
      </ul>
    );
  }
}

ListActions.propTypes = {
  data: PropTypes.arrayOf(
    PropTypes.shape({
      typeIcon: PropTypes.string.isRequired,
    }),
  ).isRequired,
  onChange: PropTypes.func,
  className: PropTypes.string,
};
