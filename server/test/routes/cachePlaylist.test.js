const chai = require('chai');
const chaiHttp = require('chai-http');

const User = require('../../models/User');
const initTestSetup = require('../testSetup');
const code = require('../../utils/statusCodes');
const app = require('../../app');
const keys = require('../../config/keys');

chai.use(chaiHttp);
const expect = chai.expect;

describe('POST /api/playlist/cache', () => {
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

    const res = await chai
      .request(app)
      .post(route)
      .send(playlistData);

    user = await User.findOne({ spotifyId: 123 });
    const newPlaylistCount = user.cache.length;

    expect(res).to.have.status(code.OK);
    expect(res.body.success).to.be.true;
    expect(user.cache[0].tracks[0].name).to.equal('Heller');
    expect(user.cache[0].tracks[1].name).to.equal('Ayo');
    expect(newPlaylistCount).to.equal(oldPlaylistCount + 1);
  });
});
