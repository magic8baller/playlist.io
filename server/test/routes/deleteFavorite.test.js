const chai = require('chai');
const mongoose = require('mongoose');

const User = require('../../models/User');
const initTestSetup = require('../testSetup');
const code = require('../../utils/statusCodes');
const keys = require('../../config/keys');
const { postReq, deleteReq } = require('../testHelpers');

const expect = chai.expect;

// TODO: figure out how to test req.query
// TODO: clean up tests by putting all data in shared scope
describe('DELETE /api/favorite', () => {
  before((done) => {
    users = mongoose.connection.collections.users;
    users.drop(() => {
      done();
    });
  });

  it('should delete favorited track from favorites array', async () => {
    const route = '/api/favorite';
    const trackData = {
      id: '1',
      name: 'Awesome New Song'
    };

    const addFavoriteData = {
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

    const deleteFavoriteData = {
      data: {
        query: 'programming',
        spotifyId: 123,
        trackData: JSON.stringify(trackData)
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
    expect(res.body.favorites.length).to.equal(0);
    expect(newFavoritesCount).to.equal(oldFavoritesCount - 1);
  });

  it(`should update track's cached favorite prop`, async () => {
    const cachePlaylistRoute = '/api/playlist/cache';
    const favoriteRoute = '/api/favorite';
    const trackData = {
      id: '1',
      name: 'Awesome Song'
    };

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

    const addFavoriteData = {
      data: {
        query: 'programming',
        spotifyId: 123,
        trackData
      }
    };

    const deleteFavoriteData = {
      data: {
        query: 'programming',
        spotifyId: 123,
        trackData: JSON.stringify(trackData)
      }
    };

    let user = new User({ spotifyId: 123 });
    await user.save();

    await postReq(cachePlaylistRoute, playlistDataOne);

    await postReq(cachePlaylistRoute, playlistDataTwo);

    await postReq(favoriteRoute, addFavoriteData);

    const oldUser = await User.findOne({ spotifyId: 123 });
    const oldFavoriteState = oldUser.cache[0].tracks[0].isFavorited;

    const res = await deleteReq(favoriteRoute, deleteFavoriteData);

    const newUser = await User.findOne({ spotifyId: 123 });
    const newFavoriteState = newUser.cache[0].tracks[0].isFavorited;

    expect(res).to.have.status(code.OK);
    expect(res.body.success).to.be.true;
    expect(res.body.cache[0].tracks[0].isFavorited).to.be.false;
    expect(res.body.cache).to.have.length(2);
    expect(res.body.cache[0].tracks).to.have.length(2);
    expect(res.body.current).to.have.length(2);
    expect(res.body.current[0]).to.include(playlistDataOne.playlist[0]);
    expect(oldFavoriteState).to.not.equal(newFavoriteState);
    expect(newFavoriteState).to.be.false;
  });
});
