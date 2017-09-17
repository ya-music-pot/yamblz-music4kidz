import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import cl from 'classname';

import ButtonCircle from '_components/ButtonCircle';
import Button from '_components/Button';
import Icon from '_components/Icon';

import ListTracks from '_pages/App/ListTracks';
import { getGradientStyle } from '_helpers';

import style from './style.styl';

class Playlist extends Component {
  state = {
    miniStyle: false,
    bgHeader: getGradientStyle(this.props.gradients),
  }

  componentDidMount() {
    document.addEventListener('scroll', this._handleScroll);
  }

  componentWillUnmount() {
    document.removeEventListener('scroll', this._handleScroll);
  }

  _handleScroll = () => {
    const scrollTop = Math.max(
      document.documentElement.scrollTop,
      document.body.scrollTop,
    );
    const { miniStyle } = this.state;

    if (scrollTop > 0 && !miniStyle) {
      this.setState({
        miniStyle: true,
      });
    } else if (scrollTop === 0 && miniStyle) {
      this.setState({
        miniStyle: false,
      });
    }
  }

  _handleBack() {

  }

  _handlePlay() {

  }

  renderPlay() {
    return (
      <Button style={style.play}>
        <Icon className={style.playIcon} typeIcon="play-card" />
        <h3 className={style.playTitle}>Слушать подборку</h3>
      </Button>
    );
  }

  renderHeader() {
    const { bgHeader } = this.state;
    const { playerInfo } = this.props;
    const { cardTitle, cardCover } = playerInfo;

    const styleCover = {
      backgroundImage: `url(${cardCover})`,
    };

    return (
      <div
        className={cl(style.header)}
        style={bgHeader}
      >
        <i className={style.cover} style={styleCover} />
        <ButtonCircle
          nameIcon="back"
          onClick={this._handleBack}
          className={style.back}
        />
        <div className={style.headerContent}>
          <h1 className={style.title}>{cardTitle}</h1>
        </div>
        { this.renderPlay() }
      </div>
    );
  }

  render() {
    const { miniStyle } = this.state;

    return (
      <div className={cl(style.container, miniStyle && style.containerMini)}>
        { this.renderHeader() }
        <div className={style.tracks}>
          <ListTracks />
        </div>
      </div>
    );
  }
}

Playlist.propTypes = {
  gradients: PropTypes.array,
};

export default connect((state, props) => ({
  user: state.user,
  gradients: state.dictionaries.backgroundsList.gradients,
  playerInfo: {
    cardType: 3,
    cardTitle: 'Холодное сердце',
    cardCover: 'https://dl.dropboxusercontent.com/s/eqgn54qhwcnan4i/frozen.png?dl=0',
  },
  ...props,
}))(Playlist);
