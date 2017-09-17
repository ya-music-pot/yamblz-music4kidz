import 'whatwg-fetch';
import { API } from '_helpers';
import { AppError } from '_helpers/errors';

const START = '_START';
const FAIL = '_FAIL';
const SUCCESS = '_SUCCESS';

/**
 * [The function is middleware for work with api in actions.]
 * @param  {Function} { dispatch })
 * @return {Function}
 */
export default ({ dispatch }) => (next) => (action) => {
  const { callAPI, type, ...rest } = action;

  if (!callAPI) {
    return next(action);
  }

  dispatch({ ...rest, type: type + START });

  const { body, method } = callAPI;
  const requestBody = typeof body === 'object' ? JSON.stringify(body) : body;

  const options = {
    body: requestBody,
    method: method || 'GET',
  };

  return API(callAPI.url, options)
    .then((response) => {
      const contentType = response.headers.get('content-type');
      if (contentType && contentType.includes('application/json')) {
        return response.json();
      }
      // При удалении трека, бэк возврашает null в contentType
      // и кидается ошибка. Исключение.
      return Promise.resolve({});
    })
    .then((data) => {
      if (data.error) {
        return Promise.reject(data);
      }

      return dispatch({
        ...rest,
        response: { data },
        type: type + SUCCESS,
      });
    })
    .catch((error) => {
      // TODO: Отлавливать также ошибки по коду выше.
      generateError(rest, error, type, dispatch);
    });
};

/* Helpers */

/**
 * [generateError create new action with error for reducers and print error]
 * @param  {Object} rest
 * @param  {Object} error
 * @param  {String} type
 * @param  {Function} dispatch
 * @return {Error}
 */
function generateError(rest, error, type, dispatch) {
  dispatch({ ...rest, error, type: type + FAIL });
  throw new AppError(type, error);
}
