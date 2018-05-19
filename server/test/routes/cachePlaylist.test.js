const chai = require('chai');
const mongoose = require('mongoose');

const User = require('../../models/User');
const initTestSetup = require('../testSetup');
const code = require('../../utils/statusCodes');
const keys = require('../../config/keys');
const { postReq } = require('../testHelpers');

const expect = chai.expect;

describe('POST /api/playlist/cache', () => {
  before((done) => {
    const users = mongoose.connection.collections.users;
    users.drop(() => {
      done();
    });
  });

  it.only('should cache a playlist', async () => {
    const route = '/api/playlist/cache';
    const playlistData = {
      query: 'programming',
      spotifyId: 123,
      tracks: [{ name: 'Heller' }, { name: 'Ayo' }]
    };

    let user = new User({ spotifyId: 123, cache: [] });
    await user.save();

    user = await User.findOne({ spotifyId: 123 });
    const oldPlaylistCount = user.cache.length;

    const res = await postReq(route, playlistData);

    user = await User.findOne({ spotifyId: 123 });
    const newPlaylistCount = user.cache.length;

    expect(res).to.have.status(code.OK);
    expect(res.body.success).to.be.true;
    expect(user.cache[0].tracks[0].isFavorited).to.be.false;
    expect(user.cache[0].tracks[0].name).to.equal('Heller');
    expect(user.cache[0].tracks[1].name).to.equal('Ayo');
    expect(newPlaylistCount).to.equal(oldPlaylistCount + 1);
  });
});
