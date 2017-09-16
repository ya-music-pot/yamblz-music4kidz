import { API } from '_helpers';
import { AppError, SVG_LOAD_ERROR } from '_helpers/errors';

/**
 * @param  {Object} options
 */
export default function svgLoad(options) {
  const url = options && options.filename ? options.filename : null;

  if (!url) {
    throw new AppError(SVG_LOAD_ERROR, { message: 'Файл для SVG не найден' });
  }

  return API(url)
    .then((response) => response.text())
    .then((responseText) => {
      if (!responseText || responseText.substr(0, 4) !== '<svg') {
        throw new AppError(SVG_LOAD_ERROR, { message: 'Загружены не SVG файлы.' });
      }

      const div = document.createElement('div');
      div.innerHTML = responseText;
      document.body.insertBefore(div, document.body.childNodes[0]);
    })
    .catch(() => {
      throw Error(SVG_LOAD_ERROR, { message: 'Ошибка запроса за SVG файлами.' });
    });
}
