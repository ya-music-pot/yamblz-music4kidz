export const GET_USER = 'GET_USER';
export const UPDATE_USER = 'UPDATE_USER';
export const GET_ALL_TRACKS = 'GET_ALL_TRACKS';
export const GET_ALL_PLAYLISTS = 'GET_ALL_PLAYLISTS';

export function getUser(id) {
  return {
    type: GET_USER,
    callAPI: {
      url: `${API_URL}user/${id}`,
    },
  };
}

export function updateUser(data) {
  const {
    id, moodId, actionId,
    moveNext,
  } = data;

  return {
    type: UPDATE_USER,
    moveNext,
    callAPI: {
      method: 'POST',
      url: `${API_URL}user/${id}?mood_id=${moodId}&action_id=${actionId}`,
    },
    player: {
      id,
    },
  };
}

export function getAllTracks(id) {
  return {
    type: GET_ALL_TRACKS,
    callAPI: {
      url: `${API_URL}user/${id}/add_track`,
    },
  };
}

export function getAllPlaylists(id) {
  return {
    type: GET_ALL_PLAYLISTS,
    callAPI: {
      url: `${API_URL}user/${id}/add_playlist`,
    },
  };
}
