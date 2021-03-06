import React, { Component } from 'react';
import PropTypes from 'prop-types';
import cl from 'classname';

import CircularAvatar from '_components/CircularAvatar';
import MoodSelector from '_components/MoodSelector';
import CARDS from '_data/cardsType';
import { getTime } from '_helpers';

import Header from './Header';
import Likes from './Likes';
import Controls from './Controls';
import Footer from './Footer';
import Background from './Background';

import style from './style.styl';

export default class FullPlayer extends Component {
  _changeHeight = () => {
    const height = window.innerHeight;
    return {
      height: `${height}px`,
    };
  }

  render() {
    const {
      playerState, cardType, playerCallbacks,
      cardTitle, emojiStatus, isAdded,
      userInfo, listEmoji, listActions,
      onOpenSelector, isSelector, onCloseSelector,
      dislikeDisabled,
    } = this.props;

    const {
      onClickArrowDown, onLikeClick, onDislikeClick,
    } = playerCallbacks;

    const {
      trackName, singerName, position,
      duration, cover, isPlaying,
      isRepeatMode,
    } = playerState;

    const percentage = position / duration;
    const { blured } = style;
    return (
      <div>
        <div className={cl(style.wrapper, isSelector && blured)} style={this._changeHeight()}>
          <Header
            onClickArrowDown={onClickArrowDown}
            cardType={cardType}
            cardTitle={cardTitle}
            emojiStatus={emojiStatus}
          />
          <div className={style.mainRow}>
            { cardType === CARDS.personal &&
            <Likes
              onLikeClick={onLikeClick}
              onDislikeClick={onDislikeClick}
              dislikeDisabled={dislikeDisabled}
            /> }
            <CircularAvatar
              image={cover}
              progress={percentage}
              time={getTime(position, duration)}
            />
          </div>
          <div className={style.titleRow}>
            <div className={style.songName}>{trackName}</div>
            <div className={style.artistName}>{singerName}</div>
          </div>
          <Controls
            callbacks={playerCallbacks}
            isPlaying={isPlaying}
            cardType={cardType}
          />
          <Footer
            callbacks={playerCallbacks}
            isRepeatMode={isRepeatMode}
            cardType={cardType}
            isAdded={isAdded}
            onOpenSelector={onOpenSelector}
          />
          <Background cover={cover} />
        </div>
        { cardType === CARDS.personal && isSelector &&
        <MoodSelector
          onCloseSelector={onCloseSelector}
          listEmoji={listEmoji}
          listActions={listActions}
          userInfo={userInfo}
        />
        }
      </div>
    );
  }
}

FullPlayer.propTypes = {
  playerCallbacks: PropTypes.objectOf(PropTypes.func),
  onCloseSelector: PropTypes.func,
  onOpenSelector: PropTypes.func,
  playerState: PropTypes.object,
  cardType: PropTypes.number,
  cardTitle: PropTypes.string,
  emojiStatus: PropTypes.object,
  isAdded: PropTypes.bool,
  userInfo: PropTypes.object,
  listEmoji: PropTypes.object,
  listActions: PropTypes.object,
  isSelector: PropTypes.bool,
  dislikeDisabled: PropTypes.bool,
};
