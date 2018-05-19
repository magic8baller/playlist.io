const chai = require('chai');
const chaiHttp = require('chai-http');

const User = require('../../models/User');
const initTestSetup = require('../testSetup');
const code = require('../../utils/statusCodes');
const app = require('../../app');
const keys = require('../../config/keys');

chai.use(chaiHttp);
const expect = chai.expect;

describe('POST /api/playlist', () => {
  it('should save a playlist', async () => {
    const route = '/api/playlist/save';
    const data = {
      spotifyId: 123,
      title: 'My Awesome Playlist',
      tracks: [{ name: 'Heller' }, { name: 'Ayo' }]
    };

    let user = new User({ spotifyId: 123, playlists: [] });
    await user.save();

    user = await User.findOne({ spotifyId: 123 });
    const oldPlaylistCount = user.playlists.length;

    const res = await chai
      .request(app)
      .post(route)
      .send(data);

    user = await User.findOne({ spotifyId: 123 });
    const newPlaylistCount = user.playlists.length;

    expect(res).to.have.status(code.OK);
    expect(res.body.success).to.be.true;
    expect(newPlaylistCount).to.equal(oldPlaylistCount + 1);
  });
});
