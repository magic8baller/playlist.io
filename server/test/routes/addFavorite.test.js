const chai = require('chai');
const chaiHttp = require('chai-http');
const mongoose = require('mongoose');

const User = require('../../models/User');
const initTestSetup = require('../testSetup');
const code = require('../../utils/statusCodes');
const app = require('../../app');
const keys = require('../../config/keys');

chai.use(chaiHttp);
const expect = chai.expect;

describe('POST /api/favorite', () => {
  it('should add favorited track to favorites array in DB', async () => {
    const route = '/api/favorite';
    const data = {
      spotifyId: 123,
      spotifyData: {
        id: '231432',
        name: 'Awesome New Song',
        album: { name: 'Awesome Album' },
        artists: [{ name: 'Kesha' }]
      }
    };

    let user = new User({ spotifyId: 123, favorites: [] });
    await user.save();

    user = await User.findOne({ spotifyId: 123 });
    const oldFavoritesCount = user.favorites.length;

    const res = await chai
      .request(app)
      .post(route)
      .send(data);

    user = await User.findOne({ spotifyId: 123 });
    const newFavoritesCount = user.favorites.length;

    expect(res).to.have.status(code.OK);
    expect(res.body.success).to.be.true;
    expect(newFavoritesCount).to.equal(oldFavoritesCount + 1);
  });

  it('should add favorited track to cache object in DB', async () => {
    const route = '/api/favorite';
    const data = {
      query: 'programming',
      spotifyId: 123,
      spotifyData: {
        id: '38932',
        name: 'Awesome New Song',
        album: { name: 'Awesome Album' },
        artists: [{ name: 'Kesha' }],
        isFavorited: false
      }
    };

    let user = new User({ spotifyId: 123 });
    await user.save();

    user = await User.findOne({ spotifyId: 123 });
    const oldCacheCount = user.cache.length;

    const res = await chai
      .request(app)
      .post(route)
      .send(data);

    user = await User.findOne({ spotifyId: 123 });
    const newCacheCount = user.cache.length;

    expect(res).to.have.status(code.OK);
    expect(res.body.success).to.be.true;
    expect(newCacheCount).to.equal(oldCacheCount + 1);
  });

  it('should return an error when given an incorrect ID', async () => {
    const route = '/api/favorite';
    const data = {
      spotifyId: 0,
      spotifyData: {
        id: '231432',
        name: 'Awesome New Song',
        album: { name: 'Awesome Album' },
        artists: [{ name: 'Kesha' }]
      }
    };

    let user = new User({ spotifyId: 123, favorites: [] });
    await user.save();

    const res = await chai
      .request(app)
      .post(route)
      .send(data);

    expect(res).to.have.status(code.USER_ERROR);
    expect(res.body.error.code).to.equal(code.USER_ERROR);
    expect(res.body.error.message).to.equal('Invalid Spotify ID.');
  });

  it('should return an error if the track is a duplicate', async () => {
    const route = '/api/favorite';
    const data = {
      spotifyId: 123,
      spotifyData: {
        id: '231432',
        name: 'Awesome New Song',
        album: { name: 'Awesome Album' },
        artists: [{ name: 'Kesha' }]
      }
    };

    let user = new User({ spotifyId: 123, favorites: [] });
    await user.save();

    await chai
      .request(app)
      .post(route)
      .send(data);

    const res = await chai
      .request(app)
      .post(route)
      .send(data);

    expect(res).to.have.status(code.USER_ERROR);
    expect(res.body.error.code).to.equal(code.USER_ERROR);
    expect(res.body.error.message).to.equal(
      'You have already favorited this track. You must really like it!'
    );
  });
});
