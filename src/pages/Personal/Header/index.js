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
    const { order } = this.props;

    this.minTransform = -WIDTH_SLIDE * order.length + docWidth;
  }

  render() {
    const {
      avatar, userName, className,
      order, data, onBackClick
    } = this.props;

    return (
      <div className={cl(style.header, style[className])}>
        <div
          className={cl(style.button, style.buttonBack)}
          onClick={onBackClick}
        />
        <div className={cl(style.button, style.buttonSettings)} />
        <Avatar
          className={style.avatar}
          avatar={avatar}
        />
        <div className={style.userName}>
          {userName}
        </div>
        <div className={style.totalScore}>
          {plural(8, '%d награда', '%d награды', '%d наград')}
        </div>
        <Slider
          className={cl(style.slider, style[className])}
          widthSlide={WIDTH_SLIDE}
          initTransform={MAX_TRANSFORM}
          maxTransform={MAX_TRANSFORM}
          minTransform={this.minTransform}
        >
          {
            order.map(key => {
              const { id, typeIcon, title } = data[key];
              const disabled = true;

              return (
                <Achievement
                  typeIcon={typeIcon}
                  title={title}
                  disabled={disabled}
                  key={id}
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
  className: PropTypes.string,
  order: PropTypes.arrayOf(PropTypes.number),
  data: PropTypes.object,
  onBackClick: PropTypes.func,
};
