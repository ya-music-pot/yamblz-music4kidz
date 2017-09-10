import React, { Component } from 'react';
import PropTypes from 'prop-types';

import CircularAvatar from '_components/CircularAvatar';
import CARDS from '_data/cardsType';

import Header from './Header';
import Likes from './Likes';
import Controls from './Controls';
import Footer from './Footer';
import Background from './Background';

import style from './style.styl';

export default class FullPlayer extends Component {
  render() {
    const {
      playerState, cardType, onTogglePlay,
      onClickNext, onClickPrevious, onClickRepeat,
      openListTracks, onClickArrowDown,
    } = this.props;

    const {
      trackName, singerName, position,
      duration, cover, isPlaying, isRepeatMode,
    } = playerState;

    const percentage = position / duration;
    return (
      <div>
        <div className={style.wrapper}>
          <Header
            onClickArrowDown={onClickArrowDown}
            cardType={cardType}
          />
          <div>
            { cardType === CARDS.personal && <Likes /> }
            <CircularAvatar
              image={cover}
              progress={percentage}
              radius={0.18}
              time={getTime(position, duration)}
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

/**
 * getTime — get string minutes:seconds
 * @param  {Number} position
 * @param  {Number} duration
 * @return {String}
 */
function getTime(position, duration) {
  const diffTrackPosition = position - duration;
  const minutesLeft = parseInt(diffTrackPosition / 60, 10).toString();
  const sec = -(parseInt(diffTrackPosition, 10) - minutesLeft * 60);
  const secondsLeft = (sec < 10 ? `0${sec}` : sec).toString();

  return `${minutesLeft}:${secondsLeft}`;
}
