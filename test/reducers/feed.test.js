/* eslint-env jest */
import { GET_FEED } from '_actions/feed';
import feedReducer from '_reducers/feed';

describe('feed reducer', () => {
  it('should return the initial state', () => {
    expect(feedReducer(undefined, {})).toEqual({});
  });

  it('should handle GET_FEED_START', () => {
    expect(feedReducer({}, { type: `${GET_FEED}_START` })).toEqual({
      loading: true,
      loaded: false,
    });
  });

  it('should handle GET_FEED_FAIL', () => {
    expect(feedReducer({}, { type: `${GET_FEED}_FAIL` })).toEqual({
      loading: false,
      loaded: true,
    });
  });

  it('should handle GET_FEED_SUCCESS', () => {
    const feed = [{
      id: 65536,
      type: 2,
      name: 'Frank Sinatra',
      description: 'Blue Moon',
      image_url: 'http://i.imgur.com/u5CJQoh.jpg',
      tracks: [{
        id: 4451438,
        name: 'Blue Moon',
        artist: 'Frank Sinatra',
        lyrics: 'null',
        image_url: 'http://i.imgur.com/u5CJQoh.jpg',
        mp3_url: 'https://dl.dropboxusercontent.com/s/2om6xhxtexlrx3m/frank_sinatra_blue_moon.mp3'
      }],
    }];

    expect(feedReducer({}, {
      type: `${GET_FEED}_SUCCESS`,
      response: {
        data: feed,
      },
    })).toEqual({
      loading: false,
      loaded: true,
      data: feed,
    });
  });
});

