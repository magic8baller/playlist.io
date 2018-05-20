const chai = require('chai');
const mongoose = require('mongoose');

const User = require('../../models/User');
const initTestSetup = require('../testSetup');
const code = require('../../utils/statusCodes');
const keys = require('../../config/keys');
const { postReq, deleteReq } = require('../testHelpers');

const expect = chai.expect;

describe('DELETE /api/favorite', () => {
  beforeEach((done) => {
    users = mongoose.connection.collections.users;
    users.drop(() => {
      done();
    });
  });

  it('should delete favorited track from favorites array', async () => {
    const route = '/api/favorite';
    const addFavoriteData = {
      spotifyId: 123,
      trackData: {
        id: '1',
        name: 'Awesome New Song',
        album: { name: 'Awesome Album' },
        artists: [{ name: 'Kesha' }]
      }
    };

    const deleteFavoriteData = {
      query: 'programming',
      spotifyId: 123,
      trackData: {
        id: '1',
        name: 'Awesome New Song'
      }
    };

    let user = new User({ spotifyId: 123 });
    await user.save();

    await postReq(route, addFavoriteData);

    user = await User.findOne({ spotifyId: 123 });
    const oldFavoritesCount = user.favorites.length;

    const res = await deleteReq(route, deleteFavoriteData);

    user = await User.findOne({ spotifyId: 123 });
    const newFavoritesCount = user.favorites.length;

    expect(res).to.have.status(code.OK);
    expect(res.body.success).to.be.true;
    expect(newFavoritesCount).to.equal(oldFavoritesCount - 1);
  });

  it(`should update track's cached favorite prop`, async () => {
    const cachePlaylistRoute = '/api/playlist/cache';
    const favoriteRoute = '/api/favorite';

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

    const favoriteData = {
      query: 'programming',
      spotifyId: 123,
      trackData: {
        id: '1',
        name: 'Awesome New Song'
      }
    };

    let user = new User({ spotifyId: 123 });
    await user.save();

    await postReq(cachePlaylistRoute, playlistDataOne);

    await postReq(cachePlaylistRoute, playlistDataTwo);

    await postReq(favoriteRoute, favoriteData);

    const oldUser = await User.findOne({ spotifyId: 123 });
    const oldFavoriteState = oldUser.cache[0].tracks[0].isFavorited;

    const res = await deleteReq(favoriteRoute, favoriteData);

    const newUser = await User.findOne({ spotifyId: 123 });
    const newFavoriteState = newUser.cache[0].tracks[0].isFavorited;

    expect(res).to.have.status(code.OK);
    expect(res.body.success).to.be.true;
    expect(oldFavoriteState).to.not.equal(newFavoriteState);
    expect(newFavoriteState).to.be.false;
  });
});
