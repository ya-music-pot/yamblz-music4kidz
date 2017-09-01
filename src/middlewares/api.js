import 'whatwg-fetch';

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

  const options = {
    body: callAPI.data,
    method: callAPI.method || 'GET',
  };

  return window.fetch(callAPI.url, options)
    .then((response) => response.json())
    .then((dataJSON) => {
      const data = JSON.parse(dataJSON);

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
 * @param  {Object} error    [response]
 * @param  {String} type
 * @param  {Function} dispatch
 * @return {Error}
 */
function generateError(rest, error, type, dispatch) {
  dispatch({ ...rest, error, type: type + FAIL });
  return new Error(error);
}
