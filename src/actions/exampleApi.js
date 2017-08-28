export function getApi() {
  return {
    type: 'GET_API',
    callAPI: {
      url: '/artists/42581/tracks',
    },
  };
};
