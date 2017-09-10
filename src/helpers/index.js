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
