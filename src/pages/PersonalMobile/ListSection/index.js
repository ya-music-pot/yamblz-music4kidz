import React, { Component } from 'react';
import PropTypes from 'prop-types';
import cl from 'classname';

import Icon from '_components/Icon';
import CardList from '_components/CardList';
import TrackInfo from '_components/TrackInfo';
import style from './style.styl';

export default class ListSection extends Component {
  _handleCardClick = (params) => {
    window.jsHandler.playlistClick(params.playlistId);
  };

  _handleTrackClick = (id) => {
    window.jsHandler.trackClick(id);
  };

  _renderTrack = (data) => {
    const {
      id, name, artist,
      image_url,
    } = data;
    const { trackId, isPlaying } = this.props;

    return (
      <TrackInfo
        key={id}
        currentTrack={id === trackId}
        className={style.trackInfoItem}
        isPlaying={id === trackId && isPlaying}
        trackId={id}
        name={name}
        artist={artist}
        imageUrl={image_url}
        onClick={this._handleTrackClick.bind(null, id)}
      />
    );
  };

  render() {
    const {
      stickyFilter, activeTab, cardListData,
      onToggle,
    } = this.props;

    const callbacks = {
      onButtonClick: this._handleCardClick,
      onCardClick: this._handleCardClick,
    };

    return (
      <div>
        <div className={cl(style.filter, stickyFilter && style.filterSticky)}>
          <div
            className={cl(style.filterItem, activeTab === 'playlists' && style.active)}
            onClick={onToggle.bind(this, 'playlists')}
          >
            Мои подборки
          </div>
          <div
            className={cl(style.filterItem, activeTab === 'tracks' && style.active)}
            onClick={onToggle.bind(this, 'tracks')}
          >
            Мои песни
          </div>
        </div>
        {
          (cardListData.length > 0 &&
          activeTab === 'playlists') &&
          <div className={style.cardList}>
            <CardList
              data={cardListData}
              callbacks={callbacks}
            />
          </div>
        }

        {
          (cardListData.length > 0 &&
          activeTab === 'tracks') &&
          <div className={style.trackInfo}>
            {cardListData.map((item) => this._renderTrack(item))}
          </div>
        }

        {
          (cardListData.length === 0 &&
          activeTab === 'playlists') &&
          <div className={style.emptyContainer}>
            <div className={style.emptyText}>
              Здесь будут твои любимые и сохранённые подборки
              <br />
              Нажми нa <Icon typeIcon="like" className={style.iconHeart} />, чтобы сохранить
            </div>
          </div>
        }

        {
          (cardListData.length === 0 &&
          activeTab === 'tracks') &&
          <div className={style.emptyContainer}>
            <div className={style.emptyText}>
              Здесь будут твои любимые и сохранённые песни
              <br />
              Нажми нa <Icon typeIcon="plus" className={style.icon} />, чтобы сохранить
            </div>
          </div>
        }
      </div>
    );
  }
}

ListSection.propTypes = {
  trackId: PropTypes.number,
  isPlaying: PropTypes.bool,
  stickyFilter: PropTypes.bool,
  activeTab: PropTypes.string,
  cardListData: PropTypes.arrayOf(PropTypes.object),
  onToggle: PropTypes.func,
};
