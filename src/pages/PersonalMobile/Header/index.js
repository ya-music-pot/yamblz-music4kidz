import React, { Component } from 'react';
import PropTypes from 'prop-types';
import cl from 'classname';
import plural from 'plural-ru';

import Avatar from '_components/Avatar';
import Slider from '_decorators/Slider';
import Achievement from '_components/Achievement';
import style from './style.styl';

const WIDTH_SLIDE = 160;
const MAX_TRANSFORM = 0;

export default class Header extends Component {
  componentWillMount() {
    const docWidth = document.body.clientWidth;
    const { order } = this.props.achievementsDict;

    this.minTransform = -WIDTH_SLIDE * order.length + docWidth;
  }

  _handleAchievementClick = (id) => {
    window.jsHandler.achievementClick(id);
  };

  render() {
    const {
      avatar, userName, sticky,
      achievementsDict,
      userAchievements,
    } = this.props;
    const { order, data } = achievementsDict;

    return (
      <div className={cl(style.container, sticky && style.containerSticky)}>
        <div className={cl(style.header, sticky && style.headerSticky)}>
          <Avatar
            className={style.avatar}
            avatar={avatar}
          />
          <div className={style.userName}>
            {userName}
          </div>
        </div>

        <div className={style.totalScore}>
          {plural(userAchievements.length, '%d награда', '%d награды', '%d наград')}
        </div>

        <Slider
          className={style.slider}
          widthSlide={WIDTH_SLIDE}
          initTransform={MAX_TRANSFORM}
          maxTransform={MAX_TRANSFORM}
          minTransform={this.minTransform}
        >
          {
            order.map(key => {
              const { id, typeIcon, title } = data[key];
              const disabled = !userAchievements.find(item => item.id === id);

              return (
                <Achievement
                  typeIcon={typeIcon}
                  title={title}
                  disabled={disabled}
                  key={id}
                  id={id}
                  onClick={this._handleAchievementClick.bind(this, id)}
                />
              );
            })
          }
        </Slider>
      </div>
    );
  }
}

Header.propTypes = {
  avatar: PropTypes.string,
  userName: PropTypes.string,
  sticky: PropTypes.bool,
  achievementsDict: PropTypes.object,
  userAchievements: PropTypes.array,
};
