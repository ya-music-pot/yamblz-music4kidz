import React, { Component } from 'react';
import PropTypes from 'prop-types';
import cl from 'classname';
import plural from 'plural-ru';

import Icon from '_components/Icon';
import Avatar from '_components/Avatar';
import Achievement from '_components/Achievement';

import style from './style.styl';

const WIDTH_SLIDE = 160;

export default class Header extends Component {
  componentWillMount() {
    const docWidth = document.body.clientWidth;
    const { order } = this.props.achievementsDict;

    this.minTransform = -WIDTH_SLIDE * order.length + docWidth;
  }

  render() {
    const {
      avatar, userName, sticky,
      achievementsDict, onBackClick,
      userAchievements,
    } = this.props;
    const { order, data } = achievementsDict;

    return (
      <div className={cl(style.container, sticky && style.containerSticky)}>
        <div className={cl(style.header, sticky && style.headerSticky)}>
          <Icon
            typeIcon="back"
            className={cl(style.button, style.buttonBack)}
            onClick={onBackClick}
          />
          <Avatar
            className={cl(style.avatar, avatar && style.avatarCover)}
            avatar={avatar}
          />
          <div className={style.userName}>
            {userName}
          </div>
        </div>

        <div className={style.totalScore}>
          {plural(userAchievements.length, '%d награда', '%d награды', '%d наград')}
        </div>

        <div className={style.slider}>
          {
            order.map(key => {
              const { id, typeIcon, title, description } = data[key];
              const disabled = !userAchievements.find(item => item.id === id);

              return (
                <Achievement
                  className={style.slide}
                  typeIcon={typeIcon}
                  title={title}
                  description={description}
                  disabled={disabled}
                  key={id}
                  id={id}
                />
              );
            })
          }
        </div>
      </div>
    );
  }
}

Header.propTypes = {
  avatar: PropTypes.string,
  userName: PropTypes.string,
  sticky: PropTypes.bool,
  achievementsDict: PropTypes.object,
  onBackClick: PropTypes.func,
  userAchievements: PropTypes.array,
};
