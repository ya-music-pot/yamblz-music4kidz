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

import { runPlayer } from '_helpers/cardCallbacks';

import style from './style.styl';

class Playlist extends Component {
  state = {
    miniStyle: false,
  }

  componentWillMount() {
    const { playerInfo, router } = this.props;

    window.scrollTo(0, 0);

    if (!playerInfo.cardPlaylistTitle) {
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
    const { router, playerInfo } = this.props;
    const pathBack = playerInfo.pathBack.pathname;
    router.push(pathBack || '/feed');
  }

  _handlePlayStart = () => {
    const { cardPlaylist, cardParams } = this.props.playerInfo;

    const track = cardPlaylist && cardPlaylist[0];
    if (track) {
      this.props.playerModeUpdate('mini');
      runPlayer({
        ...cardParams,
        trackId: track.id,
      });
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
    const { cardPlaylistCover, cardPlaylistType } = this.props.playerInfo;

    return cardPlaylistType !== CARDS.game && (
      <i className={style.cover} style={this.styleCover(cardPlaylistCover)} />
    );
  }

  renderHeader() {
    const { playerInfo } = this.props;
    const { cardPlaylistTitle } = playerInfo;

    return (
      <div className={cl(style.header)}>
        { this.renderCover() }
        <ButtonCircle
          nameIcon="back"
          onClick={this._handleBack}
          className={style.back}
        />
        <div className={style.headerContent}>
          <h1 className={style.title}>{cardPlaylistTitle}</h1>
        </div>
        { this.renderPlay() }
      </div>
    );
  }

  render() {
    const { miniStyle } = this.state;
    const { cardParams } = this.props.playerInfo;

    return this.props.isShowing && (
      <div className={cl(style.container, miniStyle && style.containerMini)}>
        { this.renderHeader() }
        <div className={style.tracks}>
          <ListTracks
            cardParams={cardParams}
            isPlaylist
          />
        </div>
      </div>
    );
  }
}

Playlist.propTypes = {
  router: PropTypes.object,
  playerInfo: PropTypes.shape({
    cardPlaylistCover: PropTypes.string,
    cardPlaylistTitle: PropTypes.string,
    cardPlaylistType: PropTypes.number,
    pathBack: PropTypes.object,
    cardPlaylist: PropTypes.array,
    cardParams: PropTypes.object,
  }),
  isShowing: PropTypes.bool,
  playerModeUpdate: PropTypes.func,
  playerPlay: PropTypes.func,
};

export default connect((state, props) => ({
  user: state.user,
  gradients: state.dictionaries.backgroundsList.gradients,
  playerInfo: state.playerInfo,
  isShowing: Boolean(state.playerInfo.cardPlaylistTitle),
  ...props,
}), {
  playerModeUpdate,
  playerPlay,
})(Playlist);
