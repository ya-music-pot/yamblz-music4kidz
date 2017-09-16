const localStorageUniqKey = 'YAMBLZ-MUSIC-';

/**
 * Определяет операционную систему устройства.
 * @return {String}
 */
export function getMobileOperatingSystem() {
  const userAgent = window.navigator.userAgent ||
                    window.navigator.vendor ||
                    window.opera;

  if (/windows phone/i.test(userAgent)) {
    return 'Windows Phone';
  }

  if (/android/i.test(userAgent)) {
    return 'Android';
  }

  if (/iPad|iPhone|iPod/.test(userAgent) && !window.MSStream) {
    return 'iOS';
  }

  return 'unknown';
}

/**
 * Save LS
 * @param  {Object}
 */
export const saveLocalStorage = (ops) => {
  if (typeof window === 'object') {
    for (const key in ops) {
      window.localStorage.setItem(`${localStorageUniqKey}${key}`, ops[key]);
    }
  }
};

/**
 * Remove keys from LS
 * @param  {Array} keys
 */
export const removeLocalStorage = (keys) => {
  if (typeof window === 'object') {
    keys.forEach((key) => (
      window.localStorage.removeItem(`${localStorageUniqKey}${key}`)
    ));
  }
};

/**
 * @return {Object}
 */
export const getLocalStorage = () => {
  if (typeof window === 'object') {
    const LS = window.localStorage;
    const keys = {};
    for (const key in LS) {
      if (~key.indexOf(localStorageUniqKey)) {
        keys[key.replace(localStorageUniqKey, '')] = LS[key];
      }
    }

    return keys;
  }

  return {};
};

/*
 * getTime — get string minutes:seconds
 * @param  {Number} position
 * @param  {Number} duration
 * @return {String}
 */
export function getTime(position, duration) {
  const diffTrackPosition = position - duration;
  const minutesLeft = parseInt(diffTrackPosition / 60, 10).toString();
  const sec = -(parseInt(diffTrackPosition, 10) - minutesLeft * 60);
  const secondsLeft = (sec < 10 ? `0${sec}` : sec).toString();

  return `${minutesLeft}:${secondsLeft}`;
}

/**
 * API
 * @param {String} url
 * @param {Object} options
 * @param {String} action.url
 * @param {Object} action.body
 * @param {Promise}
 */
export function API(url, options) {
  const defOptions = {
    credentials: 'same-origin',
    headers: {
      accept: 'application/json',
      'content-type': 'application/json',
    },
    method: 'GET',
  };

  return window.fetch(url, { ...defOptions, ...options });
}
