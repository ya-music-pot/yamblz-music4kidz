const GET_USER = 'GET_USER';

export function getUser(id) {
  return {
    type: GET_USER,
    callAPI: {
      url: `${API_URL}/user/${id}`,
    },
  };
}
