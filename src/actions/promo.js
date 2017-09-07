export const GET_PROMO = 'GET_PROMO';

export function getPromo() {
  return {
    type: GET_PROMO,
    callAPI: {
      url: `${API_URL}promo`,
    },
  };
}
