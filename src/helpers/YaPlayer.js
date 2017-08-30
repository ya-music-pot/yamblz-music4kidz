import { getScript } from './helpers';

/** Создает обертку над плеером яндек музыки
 * @class
 * */
export default class YaPlayer {
  /** Ссылка на плеер яндекс музыки
   * @member {object}
   * */
  _player = null;

  /**
   * @member {string / null} _error - Ошибка загрузки скрипта или ошибка плеера яндекс музыки
   * */
  _error = null;

  /**
   * @member {object} _playlist - Плейлист для воспроизведения
   * @property {string} _playlist.title - Наименование плейлиста
   * @property {string[]} _playlist.tracks - Массив треков для воспроизведения
   * */
  _playlist = null;

  /**
   * @member {number} _currentTrackPosition - Текущеевремя воспроизведения трека в секундах
   * */
  _currentTrackPosition = 0;

  /**
   * @member {string} _currentTrackTitle - Название трека
   * */
  _currentTrackTitle = '';

  /**
   * @member {object[]} _currentTrackArtists - Массив альбомов, в которые входит данный трек
   * */
  _currentTrackAlbums = [];

  /**
   * @member {object[]} _currentTrackArtists - Массив исполнителей для данного трека
   * */
  _currentTrackArtists = [];

  /**
   * @member {string[]} _currentTrackCoverUris - Массив URI для загрузки изображений обложек альбома
   * */
  _currentTrackCoverUris = [];

  /**
   * @member {number} _currentTrackDuration - Длительность текущего трека в секундах
   * */
  _currentTrackDuration = 0;

  /**
   * @member {number} _pausedPosition - Время, на котором воспроизведение трека поставлено на паузу, сек
   * */
  _pausedPosition = 0;

  /**
   * @function loadPlayerScript - Служит для добавления тега script на страницу с последующим созданием экземпляра плеера яндекс музыки
   * @param callback {function} - Вызывыется при успешной загрузке скрипта
   * */
  loadPlayerScript = (callback = () => { }) => {
    getScript(playerUrl, (err) => {
      if (err != null) {
        this._error = err.message;
        callback();
      }

      if (window.Ya) {
        this._player = new Ya.Music.Player();
        this._initialize();
        callback();
      }
    });
  };

  /**
   * @function _initialize - Служит для добавления подписок на события плеера яндекс музыки
   * */
  _initialize = () => {
    this._player.whenReady(() => {
      // После загрузки данных трека сохраним их
      this._player.on('trackdata', () => {
        const data = this._player.getTrackData().metadata;

        if (Array.isArray(data.albums) && data.albums.length > 0) {
          this._currentTrackAlbums = data.albums;
        }
        if (Array.isArray(data.artists) && data.artists.length > 0) {
          this._currentTrackArtists = data.artists;
        }

        this._currentTrackTitle = data.title;
        this._currentTrackDuration = data.duration;

        const baseUri = `https://${this._currentTrackAlbums[0].coverUri}`;
        this._currentTrackCoverUris = [
          baseUri.replace('%%', '300x300'),
          baseUri.replace('%%', '600x600'),
        ];
      });

      // Сохраним данные о процессе воспроизведения
      this._player.on('timeupdate', () => {
        this._currentTrackPosition = this._player.getPosition();
      });

      // Организуем автомитическое воспроизведение треков
      this._player.on('ended', () => {
        this._currentTrackPosition = 0;
        this._player.playNext('auto');
      });

      this._player.on('failed', (player, reason) => {
        this._error = reason;
      });
    });
  };

  // Методы для установки колбеков и состояния плеера

  /**
   * @function setPlaylist - Служит для установки плейлиста для воспроизведения
   * @param playlist {object} - Плейлист для воспроизведения
   * */
  setPlaylist = (playlist) => {
    this._playlist = playlist;
  };

  /**
   * @function setTrackDataCallback - Служит для установки обработчика события получения информации о треке
   * @example - В callback'е можно, например, запросить данные о текущем треке (getFullTrackData)
   * @param callback {function} - Функция, вызываемая при наступлении события trackdata
   * */
  setTrackDataCallback = (callback) => {
    if (callback) {
      this._player.on('trackdata', () => {
        // Переносим в конец очереди событий, чтобы сначала обновились данные плеера
        setTimeout(() => {
          callback();
        }, 0);
      });
    }
  };

  /**
   * @function setTrackDataCallback - Служит для установки обработчика события получения информации о процессе воспроизведения трека
   * @example - В callback'е можно, например, запросить данные о текущей позиции воспроизведения (getCurrentTrackPosition)
   * @param callback {function} - Функция, вызываемая при наступлении события trackdata
   * */
  setTimeUpdateCallback = (callback) => {
    if (callback) {
      this._player.on('timeupdate', () => {
        // Переносим в конец очереди событий, чтобы сначала обновились данные плеера
        setTimeout(() => {
          callback();
        }, 0);
      });
    }
  };

  // Методы для управления воспроизведением

  /**
   * @function play - Служит для начала воспроизведения плейлиста
   * */
  play = () => {
    this._player.play(this._playlist, null, 'playpressed', () => {
      this._player.setPosition(this._pausedPosition);
    });
  };

  /**
   * @function stop - Служит для остановки воспроизведения плейлиста
   * */
  stop = () => {
    this._pausedPosition = 0;
    this._player.stop();
  };

  /**
   * @function pause - Служит для приостановки воспроизведения прейлиста
   * */
  pause = () => {
    this._pausedPosition = this._player.getPosition();
    this._player.pause();
  };

  /**
   * @function playNext - Служит для начала воспроизведения следующего трека в плейлисте
   * */
  playNext = () => {
    this._player.playNext('skip');
  };

  /**
   * @function playPrev - Служит для начала воспроизведения предыдущего трека в плейлисте
   * */
  playPrev = () => {
    this._player.playPrev('skip');
  };

  // Методы для доступа к текущиму состоянию плеера

  /**
   * @function getPlayerError - Служит получения информации о текущей точке воспроизведения трека
   * @returns {string}
   * */
  getPlayerError = () => {
    return this._error;
  };

  /**
   * @function getPlaylist - Служит получения текущего плейлиста
   * @returns {object} _playlist
   * @property {string} _playlist.title - Наименование плейлиста
   * @property {string[]} _playlist.tracks - Массив треков для воспроизведения
   * */
  getPlaylist = () => {
    return this._playlist;
  };

  /**
   * @function getCurrentTrackPosition - Служит получения информации о текущей точке воспроизведения трека
   * @returns {number}
   * */
  getCurrentTrackPosition = () => {
    return this._currentTrackPosition || this._pausedPosition;
  };

  /**
   * @function getCurrentTrackTitle - Служит получения информации о названии трека
   * @returns {string}
   * */
  getCurrentTrackTitle = () => {
    return this._currentTrackTitle;
  };

  /**
   * @function getCurrentTrackAlbums - Служит получения альбомов, в которые входит данный трек
   * @returns {object[]}
   * */
  getCurrentTrackAlbums = () => {
    return this._currentTrackAlbums;
  };

  /**
   * @function getCurrentTrackArtists - Служит получения исполнителей данного трека
   * @returns {object[]}
   * */
  getCurrentTrackArtists = () => {
    return this._currentTrackArtists;
  };

  /**
   * @function getCurrentTrackCoverUris - Служит получения ссылок на обложки альбомов данного трека
   * @returns {string[]}
   * */
  getCurrentTrackCoverUris = () => {
    return this._currentTrackCoverUris;
  };

  /**
   * @function getCurrentTrackDuration - Служит получения длительности данного трека в секундах
   * @returns {number}
   * */
  getCurrentTrackDuration = () => {
    return this._currentTrackDuration;
  };

  /**
   * @function getFullTrackData - Служит получения полной информации о треке
   * @returns {object}
   * @property {number} currentTrackPosition - Текщая позиция вопроизведения трека
   * @property {string} currentTrackTitle - Название трека
   * @property {object[]} currentTrackAlbums - Массив альбомов, в которые входит данный трек
   * @property {object[]} currentTrackArtists - Массив исполнителей данного трека
   * @property {string[]} currentTrackCoverUris - Массив ссылок на обложки альбомов данного трека
   * @property {number} currentTrackDuration - Длительность трека в секундах
   * */
  getFullTrackData = () => {
    return {
      currentTrackPosition: this.getCurrentTrackPosition(),
      currentTrackTitle: this.getCurrentTrackTitle(),
      currentTrackAlbums: this.getCurrentTrackAlbums(),
      currentTrackArtists: this.getCurrentTrackArtists(),
      currentTrackCoverUris: this.getCurrentTrackCoverUris(),
      currentTrackDuration: this.getCurrentTrackDuration(),
    }
  };
}

const playerUrl = 'http://music.yandex.ru/api/v1.5/index.js';
