import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import cl from 'classname';

import { playerModeUpdate } from '_actions/playerInfo';
import { playerPlay } from '_actions/player';

import ButtonCircle from '_components/ButtonCircle';
import Button from '_components/Button';
import Icon from '_components/Icon';

import CARDS from '_data/cardsType';

import ListTracks from '_pages/App/ListTracks';
import { getGradientStyle } from '_helpers';

import style from './style.styl';

class Playlist extends Component {
  state = {
    miniStyle: false,
    bgHeader: getGradientStyle(this.props.gradients),
  }

  componentWillMount() {
    const { playerInfo, router } = this.props;

    window.scrollTo(0, 0);

    if (!playerInfo.cardTitle) {
      router.push('/feed');
    }
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
    } else if (scrollTop <= 0 && miniStyle) {
      this.setState({
        miniStyle: false,
      });
    }
  }

  _handleBack = () => {
    this.props.router.push('/feed');
  }

  _handlePlayStart = () => {
    const { playlist } = this.props;

    const track = playlist && playlist[0];
    if (track) {
      this.props.playerModeUpdate('mini');
      this.props.playerPlay(track.id);
    }
  }

  styleCover(cardCover) {
    return {
      backgroundImage: `url(${cardCover})`,
    };
  }

  renderPlay() {
    return (
      <Button style={style.play} onClick={this._handlePlayStart}>
        <Icon className={style.playIcon} typeIcon="play-card" />
        <h3 className={style.playTitle}>Слушать подборку</h3>
      </Button>
    );
  }

  renderCover() {
    const { cardCover, cardType } = this.props.playerInfo;

    return cardType !== CARDS.game && (
      <i className={style.cover} style={this.styleCover(cardCover)} />
    );
  }

  renderHeader() {
    const { bgHeader } = this.state;
    const { playerInfo } = this.props;
    const { cardTitle } = playerInfo;

    return (
      <div
        className={cl(style.header)}
        style={bgHeader}
      >
        { this.renderCover() }
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

    return this.props.isShowing && (
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
  router: PropTypes.object,
  playerInfo: PropTypes.shape({
    cardTitle: PropTypes.string,
    cardCover: PropTypes.string,
    cardType: PropTypes.number,
  }),
  playlist: PropTypes.array,
  isShowing: PropTypes.bool,
  playerModeUpdate: PropTypes.func,
  playerPlay: PropTypes.func,
};

export default connect((state, props) => ({
  user: state.user,
  gradients: state.dictionaries.backgroundsList.gradients,
  playerInfo: state.playerInfo,
  playlist: state.player.playlist,
  isShowing: Boolean(state.playerInfo.cardTitle),
  ...props,
}), {
  playerModeUpdate,
  playerPlay,
})(Playlist);
