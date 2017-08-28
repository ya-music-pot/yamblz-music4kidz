import React, { Component } from 'react';
import PropTypes from 'prop-types';

import Icon from '_components/Icon';
import style from './style.scss';

export default class CircleAction extends Component {
  render() {
    const { typeIcon, title, isSmall } = this.props;
    return (
      <div className={style.container}>
        <div className={style.circle}>
          <Icon
            typeIcon={typeIcon}
            className={style.icon}
          />
        </div>
        { title && <h3 className={style.title}>{title}</h3> }
      </div>
    );
  }
}

CircleAction.propTypes = {
  typeIcon: PropTypes.string.isRequired,
  title: PropTypes.string,
};
