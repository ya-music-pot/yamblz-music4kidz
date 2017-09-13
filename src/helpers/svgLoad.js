import { API } from '_helpers';

/**
 * @param  {Object} options
 */
export default function svgLoad(options) {
  const url = options && options.filename ? options.filename : null;

  if (!url) return false;

  return API(url)
    .then((response) => response.text())
    .then((responseText) => {
      if (!responseText || responseText.substr(0, 4) !== '<svg') {
        throw Error('Загружены не SVG файлы.');
      }

      const div = document.createElement('div');
      div.innerHTML = responseText;
      document.body.insertBefore(div, document.body.childNodes[0]);
    })
    .catch(() => {
      throw Error('Ошибка запроса за SVG файлами.');
    });
}
