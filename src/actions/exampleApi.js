export function getApi() {
  return {
    type: 'GET_API',
    callAPI: {
      method: 'GET',
      url: '/artists/42581/tracks',
    },
  };
}
