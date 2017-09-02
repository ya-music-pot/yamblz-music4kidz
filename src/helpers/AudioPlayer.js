import YandexAudio from 'YandexAudio/src';

const _audioPlayer = new ya.music.Audio('html5');

function _init() {
  if (window.ya) {
    return _audioPlayer.initPromise().then(() => {
      console.log('Аудио-плеер готов к работе');
    }, () => {
      console.error('Не удалось инициализировать аудио-плеер');
    });
  }

  return Promise.reject({ message: 'ya не определен' });
}

export default {
  init: () => {
    if (typeof window === 'undefined') {
      return false;
    }

    return _init();
  },

  player: _audioPlayer,
};
