import React, { Component } from 'react';
import PropTypes from 'prop-types';
import cl from 'classname';

import Icon from '_components/Icon';
import style from './style.styl';

export default class ListSettings extends Component {
  render() {
    const {
      count, className, activeEmoji,
      activeAction,
    } = this.props;

    const data = Array.from(Array(count).keys());

    return (
      <ul className={cl(style.list, className)}>
        { data.map(id => (
          <li key={`heart${id}`} className={style.item}>
            <Icon typeIcon="heart-red" className={style.icon} />
          </li>
        ))}
        { activeEmoji &&
          <li key={`emoji${activeEmoji}`} className={style.item}>
            <Icon typeIcon={activeEmoji} className={style.emoji} />
          </li>
        }
        { activeAction &&
          <li key={`action${activeAction}`} className={style.item}>
            <Icon typeIcon={activeAction} className={style.action} />
          </li>
        }
      </ul>
    );
  }
}

ListSettings.propTypes = {
  count: PropTypes.number.isRequired,
  activeEmoji: PropTypes.string.isRequired,
  activeAction: PropTypes.string.isRequired,
  className: PropTypes.string,
};
