export const GET_USER = 'GET_USER';
export const UPDATE_USER = 'UPDATE_USER';
export const CREATE_USER = 'CREATE_USER';
export const GET_ALL_TRACKS = 'GET_ALL_TRACKS';
export const GET_ALL_PLAYLISTS = 'GET_ALL_PLAYLISTS';
export const GET_ACHIEVEMENTS = 'GET_ACHIEVEMENTS';
export const ADD_PLAYLIST = 'ADD_PLAYLIST';
export const DELETE_PLAYLIST = 'DELETE_PLAYLIST';
export const ADD_USER_TRACK = 'ADD_USER_TRACK';
export const DELETE_USER_TRACK = 'DELETE_USER_TRACK';

export function getUser(id) {
  return {
    type: GET_USER,
    callAPI: {
      url: `${API_URL}user/${id}`,
    },
  };
}

export function createUser(data) {
  const { moodId, actionId, tracks } = data;

  return {
    type: CREATE_USER,
    callAPI: {
      method: 'POST',
      url: `${API_URL}user/register`,
      body: {
        login: new Date().getTime(),
        first_name: 'Катя',
        last_name: 'Соловьева',
        mood_id: moodId,
        action_id: actionId,
        avatar_url: '/assets/images/avatar.jpg',
        tracks,
      },
    },
  };
}

export function updateUser(data) {
  const { id, moodId, actionId } = data;

  return {
    type: UPDATE_USER,
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

export function addUserPlaylist(playlist) {
  return {
    type: ADD_PLAYLIST,
    payload: {
      playlist,
    },
  };
}

export function deleteUserPlaylist(playlist) {
  return {
    type: DELETE_PLAYLIST,
    payload: {
      playlist,
    },
  };
}

export function addUserTrack(track) {
  return {
    type: ADD_USER_TRACK,
    payload: {
      track,
    },
  };
}

export function deleteUserTrack(trackId) {
  return {
    type: DELETE_USER_TRACK,
    payload: {
      trackId,
    },
  };
}

export function getAchievements(id) {
  return {
    type: GET_ACHIEVEMENTS,
    callAPI: {
      url: `${API_URL}user/${id}/achievements`,
    },
  };
}
