import xhr from 'xhr';

const START = 'START';
const FAIL = 'FAIL';
const SUCCESS = 'SUCCESS';

export default ({ dispatch }) => (next) => (action) => {
  const { callAPI, type, ...rest } = action;

  if (!callAPI) {
    return next(action);
  }

  dispatch({ ...rest, type: type + START });

  const data = {
    data: callAPI.data,
    method: callAPI.method,
    url: callAPI.url,
  };

  api(data)
    .then((response) => {
      if (response.status === 'failure') {
        generateError(rest, response, type, dispatch);
      } else {
        dispatch({ ...rest, response, type: type + SUCCESS });
      }
    })
    .catch((error) => {
      generateError(rest, error, type, dispatch);
    });
};

/* Helpers */

function generateError(rest, error, type, dispatch) {
  dispatch({ ...rest, error, type: type + FAIL });
  return new Error(error);
}

function api({ url, data, method }) {
  const sendObj = {
    body: JSON.stringify(data),
    method: method || 'GET',
    url,
    headers: {
      'Content-Type': 'application/json',
    },
  };

  return new Promise((resolve, reject) => {
    xhr(sendObj, (error, resp, body) => {
      const answer = JSON.parse(body);
      if (error || (resp.statusCode !== 200 && resp.statusCode !== 201)) {
        return reject(answer || {});
      }

      return resolve(answer);
    });
  });
}
