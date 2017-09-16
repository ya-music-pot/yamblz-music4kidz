import React, { Component } from 'react';
import PropTypes from 'prop-types';
import cl from 'classname';

import Icon from '_components/Icon';
import style from './style.styl';

export default class ListSettings extends Component {
  render() {
    const {
      count, className, moodIcon,
      actionIcon,
    } = this.props;

    const data = Array.from(Array(count).keys());

    return (
      <ul className={cl(style.list, className)}>
        { data.map(id => (
          <li key={`heart${id}`} className={style.item}>
            <Icon typeIcon="heart" className={cl(style.icon, style.heart)} />
          </li>
        ))}
        { moodIcon &&
          <li key={`emoji${moodIcon}`} className={style.item}>
            <Icon typeIcon={moodIcon} className={style.emoji} />
          </li>
        }
        { actionIcon &&
          <li key={`action${actionIcon}`} className={style.item}>
            <Icon typeIcon={actionIcon} className={style.action} />
          </li>
        }
      </ul>
    );
  }
}

ListSettings.propTypes = {
  count: PropTypes.number.isRequired,
  moodIcon: PropTypes.any.isRequired,
  actionIcon: PropTypes.any.isRequired,
  className: PropTypes.string,
};
