export const GET_FEED = 'GET_FEED';

export function getFeed(id) {
  return {
    type: GET_FEED,
    callAPI: {
      url: `${API_URL}user/${id}/feed?offset=10&seed=3`,
    },
  };
}
