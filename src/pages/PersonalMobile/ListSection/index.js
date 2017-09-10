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

    return (
      <a
        href={`/#/mobile/profile?track_id=${id}`}
        className={style.trackInfoItem}
      >
        <TrackInfo
          key={id}
          currentTrack={false}
          isPlaying={false}
          trackId={id}
          name={name}
          artist={artist}
          imageUrl={image_url}
        />
      </a>
    );
  }

  _handleCardClick = (params) => {
    const { playlistId } = params;
    const link = document.querySelector('#playlistLink');
    link.setAttribute('href', `/#/mobile/profile?playlist_id=${playlistId}`);
    link.click();
    link.removeAttribute('href');
  }

  render() {
    const {
      stickyFilter, acviveTab, cardListData,
      onToggle,
    } = this.props;

    const callbacks = {
      onCardClick: this._handleCardClick,
      onButtonClick: this._handleCardClick,
    };

    return (
      <div>
        <div className={cl(style.filter, stickyFilter && style.filterSticky)}>
          <div
            className={cl(style.filterItem, acviveTab === 'playlists' && style.active)}
            onClick={onToggle.bind(this, 'playlists')}
          >
            Мои подборки
          </div>
          <div
            className={cl(style.filterItem, acviveTab === 'tracks' && style.active)}
            onClick={onToggle.bind(this, 'tracks')}
          >
            Мои песни
          </div>
        </div>
        {
          (cardListData.length > 0 &&
          acviveTab === 'playlists') &&
          <div className={style.cardList}>
            <CardList
              data={cardListData}
              callbacks={callbacks}
            />
            <a
              id="playlistLink"
              style={{ display: 'none' }}
            >
              playlist link
            </a>
          </div>
        }

        {
          (cardListData.length > 0 &&
          acviveTab === 'tracks') &&
          <div className={style.trackInfo}>
            {cardListData.map((item) => this._renderTrack(item))}
          </div>
        }

        {
          cardListData.length === 0 &&
          <div className={style.emptyContainer}>
            <div className={style.emptyText}>
              Здесь будут твои любимые и сохранённые подборки
              <br />
              Нажми нa <Icon typeIcon="like" className={style.heart} />, чтобы сохранить
            </div>
            <a href="/#/mobile/profile?search=true">
              <Button
                style={style.searchButton}
              >
                Смотреть
              </Button>
            </a>
          </div>
        }
      </div>
    );
  }
}

ListSection.propTypes = {
  stickyFilter: PropTypes.bool,
  acviveTab: PropTypes.string,
  cardListData: PropTypes.arrayOf(PropTypes.object),
  onToggle: PropTypes.func,
};

