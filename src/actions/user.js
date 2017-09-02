export const GET_USER = 'GET_USER';
export const UPDATE_USER = 'UPDATE_USER';

export function getUser(id) {
  return {
    type: GET_USER,
    callAPI: {
      url: `${API_URL}/user/${id}`,
    },
  };
}

export function updateUser({ id, moodId, actionId }) {
  return {
    type: UPDATE_USER,
    callAPI: {
      method: 'POST',
      body: { moodId, actionId },
      url: `${API_URL}/user/${id}`,
    },
  };
}
