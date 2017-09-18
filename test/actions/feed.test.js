/* eslint-env jest */
import {
  GET_FEED, LIKE_PLAYLIST, DISLIKE_PLAYLIST,
  getFeed, likePlaylist, dislikePlaylist,
} from '_actions/feed';

describe('feed action', () => {
  global.API_URL = 'https://musicforchildren.herokuapp.com/';
  it('should return GET_FEED action with id param', () => {
    expect(getFeed(5)).toEqual({
      type: GET_FEED,
      callAPI: {
        url: `${API_URL}user/5/feed?offset=10&seed=3`,
      },
    });
  });

  it('should return GET_FEED action without id', () => {
    expect(getFeed()).toEqual({
      type: GET_FEED,
      callAPI: {
        url: `${API_URL}user/guest/`,
      },
    });
  });

  it('should return LIKE_PLAYLIST action', () => {
    expect(likePlaylist(1, 1)).toEqual({
      type: LIKE_PLAYLIST,
      callAPI: {
        method: 'POST',
        url: `${API_URL}user/1/add_playlist?playlist_id=1`,
      },
    });
  });

  it('should return DISLIKE_PLAYLIST action', () => {
    expect(dislikePlaylist(2, 3)).toEqual({
      type: DISLIKE_PLAYLIST,
      callAPI: {
        method: 'DELETE',
        url: `${API_URL}user/2/add_playlist?playlist_id=3`,
      },
    });
  });

});
