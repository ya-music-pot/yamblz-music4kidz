import 'whatwg-fetch';
import { API } from '_helpers';

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
    .then((response) => response.json())
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
  return new Error(error);
}
