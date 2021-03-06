const chai = require('chai');
const chaiHttp = require('chai-http');
const mongoose = require('mongoose');

const User = require('../../models/User');
const initTestSetup = require('../testSetup');
const code = require('../../utils/statusCodes');
const keys = require('../../config/keys');
const { postReq } = require('../testHelpers');

chai.use(chaiHttp);
const expect = chai.expect;

describe('POST /api/favorite/:spotifyId', () => {
  beforeEach((done) => {
    const users = mongoose.connection.collections.users;
    users.drop(() => {
      done();
    });
  });

  it('should add favorited track to favorites array in DB', async () => {
    const route = '/api/favorite';
    const spotifyId = 123;
    const reqPayload = {
      data: {
        trackData: {
          id: '1',
          name: 'Awesome New Song',
          album: { name: 'Awesome Album' },
          artists: [{ name: 'Kesha' }]
        }
      }
    };

    let user = new User({ spotifyId });
    await user.save();

    user = await User.findOne({ spotifyId });
    const oldFavoritesCount = user.favorites.length;

    const res = await postReq(route, spotifyId, reqPayload);

    user = await User.findOne({ spotifyId });
    const newFavoritesCount = user.favorites.length;
    const newFavoritesState = user.favorites[0].isFavorited;

    expect(res).to.have.status(code.OK);
    expect(res.body.success).to.be.true;
    expect(res.body.favorites.length).to.equal(1);
    expect(res.body.favorites[0].album).to.include(reqPayload.data.trackData.album);
    expect(res.body.favorites[0].isFavorited).to.be.true;
    expect(newFavoritesCount).to.equal(oldFavoritesCount + 1);
    expect(newFavoritesState).to.be.true;
  });

  it('should update cache with favorited track', async () => {
    const cachePlaylistRoute = '/api/playlist/cache';
    const addFavoriteRoute = '/api/favorite';
    const targetQuery = 'programming';
    const spotifyId = 123;

    const playlistDataOne = {
      query: targetQuery,
      playlist: [{ id: '1', name: 'Awesome Song' }, { id: '2', name: 'Ayo' }]
    };

    const playlistDataTwo = {
      query: 'workout',
      playlist: [{ id: '3', name: 'Hey There' }, { id: '4', name: 'My Name Is...' }]
    };

    const reqPayload = {
      data: {
        query: targetQuery,
        trackData: {
          id: '1',
          name: 'Awesome New Song'
        }
      }
    };

    let user = new User({ spotifyId });
    await user.save();

    await Promise.all([
      postReq(cachePlaylistRoute, spotifyId, playlistDataOne),
      postReq(cachePlaylistRoute, spotifyId, playlistDataTwo)
    ]);

    const res = await postReq(addFavoriteRoute, spotifyId, reqPayload);

    user = await User.findOne({ spotifyId });

    expect(res).to.have.status(code.OK);
    expect(res.body.success).to.be.true;
    expect(res.body.cache[0].tracks[0]).to.include(reqPayload.data.trackData);
    expect(res.body.cache[0].tracks[0].isFavorited).to.be.true;
    expect(user.cache[0].tracks[0].isFavorited).to.be.true;
    expect(user.cache[0].tracks[1].isFavorited).to.be.false;
    expect(user.cache[1].tracks[0].isFavorited).to.be.false;
    expect(user.cache[1].tracks[1].isFavorited).to.be.false;
  });

  it('should return the currently selected tracks', async () => {
    const cachePlaylistRoute = '/api/playlist/cache';
    const addFavoriteRoute = '/api/favorite';
    const targetQuery = 'programming';
    const spotifyId = 123;

    const playlistDataOne = {
      query: targetQuery,
      playlist: [{ id: '1', name: 'Awesome Song' }, { id: '2', name: 'Ayo' }]
    };

    const playlistDataTwo = {
      query: 'workout',
      playlist: [{ id: '3', name: 'Hey There' }, { id: '4', name: 'My Name Is...' }]
    };

    const reqPayload = {
      data: {
        query: targetQuery,
        trackData: {
          id: '1',
          name: 'Awesome Song'
        }
      }
    };

    let user = new User({ spotifyId });
    await user.save();

    await Promise.all([
      postReq(cachePlaylistRoute, spotifyId, playlistDataOne),
      postReq(cachePlaylistRoute, spotifyId, playlistDataTwo)
    ]);

    const res = await postReq(addFavoriteRoute, spotifyId, reqPayload);

    user = await User.findOne({ spotifyId });

    expect(res).to.have.status(code.OK);
    expect(res.body.success).to.be.true;
    expect(res.body.current.length).to.equal(2);
    expect(res.body.current[0]).to.include(playlistDataOne.playlist[0]);
    expect(res.body.current[1]).to.include(playlistDataOne.playlist[1]);
    expect(res.body.current[0].isFavorited).to.be.true;
  });

  it('should return an error when given an incorrect ID', async () => {
    const route = '/api/favorite';
    const spotifyId = 0;

    const data = {
      data: {
        trackData: {
          id: '231432',
          name: 'Awesome New Song',
          album: { name: 'Awesome Album' },
          artists: [{ name: 'Kesha' }]
        }
      }
    };

    let user = new User({ spotifyId: 123 });
    await user.save();

    const res = await postReq(route, spotifyId, data);

    expect(res).to.have.status(code.USER_ERROR);
    expect(res.body.error.code).to.equal(code.USER_ERROR);
    expect(res.body.error.message).to.equal('Invalid Spotify ID.');
  });

  it('should return an error if the track is a duplicate', async () => {
    const route = '/api/favorite';
    const spotifyId = 123;

    const data = {
      data: {
        trackData: {
          id: '231432',
          name: 'Awesome New Song',
          album: { name: 'Awesome Album' },
          artists: [{ name: 'Kesha' }]
        }
      }
    };

    let user = new User({ spotifyId });
    await user.save();

    await postReq(route, spotifyId, data);

    const res = await postReq(route, spotifyId, data);

    expect(res).to.have.status(code.USER_ERROR);
    expect(res.body.error.code).to.equal(code.USER_ERROR);
    expect(res.body.error.message).to.equal(
      'You have already favorited this track. You must really like it!'
    );
  });
});
