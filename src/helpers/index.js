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
