import React, { Component } from 'react';
import PropTypes from 'prop-types';

import Button from '_components/Button';
import CircularAvatar from '_components/CircularAvatar';

import CARDS from '_data/cardsType';

import Background from './Background';
import Controls from './Controls';
import Footer from './Footer';

import style from './style.styl';

export default class FullPlayer extends Component {
  _handleClickDislike = () => {

  };

  _handleClickLike = () => {

  };

  renderHeader() {
    const { headerRow, buttonArrowDown, moodIcons } = style;
    // TODO: получать эмоции и класть name в стор
    const { onClickArrowDown, cardType } = this.props;
    const name = 'say my name';

    return (
      <div className={headerRow}>
        <Button style={buttonArrowDown} onClick={onClickArrowDown} />
        <div className={moodIcons}>{getTitleByCard(cardType, name)}</div>
      </div>
    );
  }

  renderLike() {
    const { vote, buttonDislike, spacer, buttonLike } = style;
    return (
      <div className={vote}>
        <Button style={buttonDislike} onClick={this._handleClickDislike} />
        <div className={spacer} />
        <Button style={buttonLike} onClick={this._handleClickLike} />
      </div>
    );
  }

  render() {
    const {
      playerState, cardType, onTogglePlay,
      onClickNext, onClickPrevious, onClickRepeat,
      openListTracks,
    } = this.props;

    const {
      trackName, singerName, position,
      duration, cover, isPlaying, isRepeatMode,
    } = playerState;

    const percentage = position / duration;
    const diffTrackPosition = position - duration;
    const minutesLeft = parseInt(diffTrackPosition / 60, 10).toString();
    const sec = -(parseInt(diffTrackPosition, 10) - minutesLeft * 60);
    const secondsLeft = (sec < 10 ? `0${sec}` : sec).toString();

    return (
      <div>
        <div className={style.wrapper}>
          { this.renderHeader() }
          <div>
            { cardType === CARDS.personal && this.renderLike() }
            <CircularAvatar
              image={cover}
              progress={percentage}
              radius={0.18}
              time={`${minutesLeft}:${secondsLeft}`}
            />
          </div>
          <div className={style.titleRow}>
            <div className={style.songName}>{trackName}</div>
            <div className={style.artistName}>{singerName}</div>
          </div>
          <Controls
            onTogglePlay={onTogglePlay}
            onClickNext={onClickNext}
            onClickPrevious={onClickPrevious}
            isPlaying={isPlaying}
            cardType={cardType}
          />
          <Footer
            onClickRepeat={onClickRepeat}
            openListTracks={openListTracks}
            isRepeatMode={isRepeatMode}
            cardType={cardType}
          />
          <Background cover={cover} />
        </div>
      </div>
    );
  }
}

FullPlayer.propTypes = {
  onTogglePlay: PropTypes.func,
  onClickPrevious: PropTypes.func,
  onClickNext: PropTypes.func,
  onClickRepeat: PropTypes.func,
  onClickArrowDown: PropTypes.func,
  openListTracks: PropTypes.func,
  playerState: PropTypes.object,
  cardType: PropTypes.number,
};

/*
  Helpers
 */
function getTitleByCard(cardType, name) {
  switch (cardType) {
    case CARDS.radio:
      return `Радио ${name}`;
    case CARDS.single:
      return 'Модный трек';
    case CARDS.game:
      return 'Слушай и играй';
    case CARDS.personal:
      return 'emoji';
    default:
      return null;
  }
}

