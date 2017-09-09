import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import cl from 'classname';

import Slider from '_decorators/Slider';
import Achievement from '_components/Achievement';
import Header from './Header';
import PlaylistToggler from './PlaylistToggler';
import style from './style.styl';

const WIDTH_SLIDE = 160;
const MAX_TRANSFORM = 0;

class Personal extends Component {
  state = {
    className: '',
  }

  componentWillMount() {
    const docWidth = document.body.clientWidth;
    const { order } = this.props.achievements;

    this.minTransform = -WIDTH_SLIDE * order.length + docWidth;
  }

  componentDidMount() {
    document.addEventListener('scroll', this._handleScroll);
  }

  componentWillUnmount() {
    document.removeEventListener('scroll', this._handleScroll);
  }

  _handleScroll = () => {
    if (document.body.scrollTop > 30) {
      this.setState({
        className: 'sticky',
      });
    } else {
      this.setState({
        className: '',
      });
    }
  }

  render() {
    const {
      firstName, lastName, avatarUrl,
    } = this.props.user;

    const { achievements } = this.props;
    const { order, data } = achievements;
    const { className } = this.state;

    return (
      <div className={cl(style.container, style[className])}>
        <Header
          avatar={avatarUrl}
          userName={`${firstName} ${lastName}`}
          className={className}
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
        <PlaylistToggler />
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
