/**
 * @function getScript - Служит для добавления тега script на страницу
 * @param url {string} - URL скрипта для загрузки
 * @param callback {function} - Функция, вызываемая по окончании загрузки скрипта
 * */
export function getScript(url, callback = () => {}) {
    if (!url) {
        callback({
            message: 'EmptyURL',
        });
    }

    const script = document.createElement("script");
    script.type = "text/javascript";
    script.async = true;
    script.src = url;

    script.onerror = () => {
        callback({
            message: 'HTTPError',
        });
    };

    script.onload = () => {
        callback(null);
    };

    const head = document.head || document.getElementsByTagName("head")[0];
    head.appendChild(script);
}
