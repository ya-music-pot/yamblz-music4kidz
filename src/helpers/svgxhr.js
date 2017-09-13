
/**
 * @param  {Object} options
 */
export default function svgXhr(options) {
  const url = options && options.filename ? options.filename : null;

  if (!url) return false;
  const _ajax = typeof XDomainRequest !== 'undefined'
    ? new window.XDomainRequest()
    : new window.XMLHttpRequest();

  const _fullPath = `${window.location.origin}${url}`;

  _ajax.open('GET', _fullPath, true);
  _ajax.onprogress = () => {};
  _ajax.onload = () => {

    if (!_ajax.responseText || _ajax.responseText.substr(0, 4) !== '<svg') {
      throw Error('Invalid SVG Response');
    }

    if (_ajax.status < 200 || _ajax.status >= 300) {
      return;
    }

    const div = document.createElement('div');
    div.innerHTML = _ajax.responseText;
    document.body.insertBefore(div, document.body.childNodes[0]);
  };

  _ajax.send();
}
