import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

import Slider from '_decorators/Slider';
import Achievement from '_components/Achievement';
import Header from './Header';
import style from './style.styl';

const WIDTH_SLIDE = 160;
const MAX_TRANSFORM = 0;

class Personal extends Component {
  componentWillMount() {
    const docWidth = document.body.clientWidth;
    const { order } = this.props.achievements;

    this.minTransform = -WIDTH_SLIDE * order.length + docWidth;
  }

  render() {
    const {
      firstName, lastName, avatarUrl,
    } = this.props.user;

    const { achievements } = this.props;
    const { order, data } = achievements;

    return (
      <div className={style.container}>
        <Header
          avatar={avatarUrl}
          userName={`${firstName} ${lastName}`}
        />
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

export default connect((state, props) => ({
  user: state.user.data,
  achievements: state.dictionaries.achievements,
  ...props,
}))(Personal);

Personal.propTypes = {
  user: PropTypes.object,
  achievements: PropTypes.object,
};
