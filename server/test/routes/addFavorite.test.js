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

describe('POST /api/favorite', () => {
  beforeEach((done) => {
    const users = mongoose.connection.collections.users;
    users.drop(() => {
      done();
    });
  });

  it.only('should add favorited track to favorites array in DB', async () => {
    const route = '/api/favorite';
    const reqPayload = {
      data: {
        spotifyId: 123,
        trackData: {
          id: '1',
          name: 'Awesome New Song',
          album: { name: 'Awesome Album' },
          artists: [{ name: 'Kesha' }]
        }
      }
    };

    let user = new User({ spotifyId: 123, favorites: [] });
    await user.save();

    user = await User.findOne({ spotifyId: 123 });
    const oldFavoritesCount = user.favorites.length;

    const res = await postReq(route, reqPayload);

    user = await User.findOne({ spotifyId: 123 });
    const newFavoritesCount = user.favorites.length;
    const newFavoritesState = user.favorites[0].isFavorited;

    expect(res).to.have.status(code.OK);
    expect(res.body.success).to.be.true;
    expect(res.body.favorites.length).to.equal(1);
    expect(res.body.favorites[0].album).to.include(reqPayload.data.trackData.album);
    expect(newFavoritesCount).to.equal(oldFavoritesCount + 1);
    expect(newFavoritesState).to.be.true;
  });

  it('should update cache with favorited track', async () => {
    const cachePlaylistRoute = '/api/playlist/cache';
    const addFavoriteRoute = '/api/favorite';

    const playlistDataOne = {
      query: 'programming',
      spotifyId: 123,
      playlist: [{ id: '1', name: 'Awesome Song' }, { id: '2', name: 'Ayo' }]
    };

    const playlistDataTwo = {
      query: 'workout',
      spotifyId: 123,
      playlist: [{ id: '3', name: 'Hey There' }, { id: '4', name: 'My Name Is...' }]
    };

    const trackData = {
      data: {
        query: 'programming',
        spotifyId: 123,
        trackData: {
          id: '1',
          name: 'Awesome New Song'
        }
      }
    };

    let user = new User({ spotifyId: 123 });
    await user.save();

    await postReq(cachePlaylistRoute, playlistDataOne);

    await postReq(cachePlaylistRoute, playlistDataTwo);

    const res = await postReq(addFavoriteRoute, trackData);

    user = await User.findOne({ spotifyId: 123 });

    expect(res).to.have.status(code.OK);
    expect(res.body.success).to.be.true;
    expect(user.cache[0].tracks[0].isFavorited).to.be.true;
    expect(user.cache[0].tracks[1].isFavorited).to.be.false;
    expect(user.cache[1].tracks[0].isFavorited).to.be.false;
    expect(user.cache[1].tracks[1].isFavorited).to.be.false;
  });

  it('should return an error when given an incorrect ID', async () => {
    const route = '/api/favorite';
    const data = {
      data: {
        spotifyId: 0,
        trackData: {
          id: '231432',
          name: 'Awesome New Song',
          album: { name: 'Awesome Album' },
          artists: [{ name: 'Kesha' }]
        }
      }
    };

    let user = new User({ spotifyId: 123, favorites: [] });
    await user.save();

    const res = await postReq(route, data);

    expect(res).to.have.status(code.USER_ERROR);
    expect(res.body.error.code).to.equal(code.USER_ERROR);
    expect(res.body.error.message).to.equal('Invalid Spotify ID.');
  });

  it('should return an error if the track is a duplicate', async () => {
    const route = '/api/favorite';
    const data = {
      data: {
        spotifyId: 123,
        trackData: {
          id: '231432',
          name: 'Awesome New Song',
          album: { name: 'Awesome Album' },
          artists: [{ name: 'Kesha' }]
        }
      }
    };

    let user = new User({ spotifyId: 123, favorites: [] });
    await user.save();

    await postReq(route, data);

    const res = await postReq(route, data);

    expect(res).to.have.status(code.USER_ERROR);
    expect(res.body.error.code).to.equal(code.USER_ERROR);
    expect(res.body.error.message).to.equal(
      'You have already favorited this track. You must really like it!'
    );
  });
});
