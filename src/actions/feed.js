export const GET_FEED = 'GET_FEED';
export const LIKE_PLAYLIST = 'LIKE_PLAYLIST';
export const DISLIKE_PLAYLIST = 'DISLIKE_PLAYLIST';

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

export function likePlaylist(userId, playlistId) {
  return {
    type: LIKE_PLAYLIST,
    callAPI: {
      method: 'POST',
      url: `${API_URL}user/${userId}/add_playlist?playlist_id=${playlistId}`,
    },
  };
}

export function dislikePlaylist(userId, playlistId) {
  return {
    type: DISLIKE_PLAYLIST,
    callAPI: {
      method: 'DELETE',
      url: `${API_URL}user/${userId}/add_playlist?playlist_id=${playlistId}`,
    },
  };
}
