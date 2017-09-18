import YandexAudio from 'YandexAudio/src'; // eslint-disable-line
import { getMobileOperatingSystem } from '_helpers';

const _audioPlayer = new ya.music.Audio('html5');

function _init() {
  const OS = getMobileOperatingSystem();

  if (window.ya) {
    if (OS === 'Android') {
      // Нужно для запуска аудио
      // (Failed to execute 'play' on 'HTMLMediaElement':
      // API can only be initiated by a user gesture.)
      // TODO: (Убрать ошибку) в плей не передается ничего
      // и сразу возникает ошибка запроса undefined,
      // если что-то передавать (путой трек), то плеер не инициализируется.
      _audioPlayer.play();
    }

    return _audioPlayer.initPromise();
  }

  return Promise.reject(new Error('Не удалось инициализировать Аудиоплеер'));
}

export default {
  init: () => {
    if (typeof window === 'undefined') {
      return Promise.reject(new Error('Не удалось инициализировать Аудиоплеер'));
    }

    return _init();
  },

  player: _audioPlayer,
};
