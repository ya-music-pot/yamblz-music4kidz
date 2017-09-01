export const GET_PLAYLIST = 'GET_PLAYLIST';

export function getPlaylist() {
  return {
    type: GET_PLAYLIST,
    callAPI: {
      url: `${API_URL}/playlist`,
    },
  };
}
