import React, { Component } from 'react';
import PropTypes from 'prop-types';
import cl from 'classname';

import Icon from '_components/Icon';
import CardList from '_components/CardList';
import Button from '_components/Button';
import TrackInfo from '_components/TrackInfo';
import style from './style.styl';

export default class ListSection extends Component {
  _renderTrack = (data) => {
    const {
      id, name, artist,
      image_url,
    } = data;
    const { trackId, isPlaying, onTrackClick } = this.props;

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
        onClick={onTrackClick.bind(null, id)}
      />
    );
  };

  render() {
    const {
      stickyFilter, activeTab, cardListData,
      callbacks, onToggle, onSearch,
    } = this.props;

    return (
      <div className={style.container}>
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
              Нажми нa <Icon typeIcon="plus" className={style.icon} />, чтобы сохранить
            </div>
            <Button
              onClick={onSearch}
              style={style.searchButton}
            >
              Смотреть
            </Button>
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
            <Button
              onClick={onSearch}
              style={style.searchButton}
            >
              Смотреть
            </Button>
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
  callbacks: PropTypes.object,
  onToggle: PropTypes.func,
  onTrackClick: PropTypes.func,
  onSearch: PropTypes.func,
};
