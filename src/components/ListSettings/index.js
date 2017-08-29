import React, { Component } from 'react';
import PropTypes from 'prop-types';
import cl from 'classname';

import Icon from '_components/Icon';
import style from './style.scss';

export default class ListSettings extends Component {
  render() {
    const { count, className } = this.props;
    const data = Array.from(Array(count).keys());

    return count > 0 && (
      <ul className={cl(style.list, className)}>
        { data.map(id => (
          <li key={`heart${id}`} className={style.item}>
            <Icon typeIcon="heart-red" />
          </li>
        ))}
      </ul>
    );
  }
}

ListSettings.propTypes = {
  count: PropTypes.number.isRequired,
  className: PropTypes.string,
};
