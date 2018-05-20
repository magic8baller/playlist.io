const chai = require('chai');
const chaiHttp = require('chai-http');
const mongoose = require('mongoose');

const User = require('../../models/User');
const initTestSetup = require('../testSetup');
const code = require('../../utils/statusCodes');
const app = require('../../app');
const keys = require('../../config/keys');
const { getReq, postReq } = require('../testHelpers');

chai.use(chaiHttp);
const expect = chai.expect;

describe('GET /api/playlists/cached/:spotifyId', () => {
  before((done) => {
    const users = mongoose.connection.collections.users;
    users.drop(() => {
      done();
    });
  });

  it('should get all cached playlists', async () => {
    const cachePlaylistRoute = '/api/playlist/cache';
    const cachedPlaylistsRoute = '/api/playlists/cached';

    const spotifyId = 123;
    const playlistData = {
      query: 'programming',
      playlist: [{ name: 'Heller' }, { name: 'Ayo' }]
    };

    const user = new User({ spotifyId });
    await user.save();

    await postReq(cachePlaylistRoute, spotifyId, playlistData);

    const res = await getReq(cachedPlaylistsRoute, spotifyId);

    expect(res).to.have.status(code.OK);
    expect(res.body.success).to.be.true;
    expect(res.body.cache).to.have.length(1);
    expect(res.body.cache[0].tracks[0]).to.include(playlistData.playlist[0]);
    expect(res.body.cache[0].tracks[1]).to.include(playlistData.playlist[1]);
  });
});
