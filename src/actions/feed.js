export const GET_FEED = 'GET_FEED';

export function getFeed(id) {
  return {
    type: GET_FEED,
    callAPI: {
      url: id
        ? `${API_URL}user/${id}/feed?offset=10&seed=3`
        : `${API_URL}user/guest/`,
    },
  };
}
