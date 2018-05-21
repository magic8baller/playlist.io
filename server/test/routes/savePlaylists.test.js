const chai = require('chai');

const User = require('../../models/User');
const initTestSetup = require('../testSetup');
const code = require('../../utils/statusCodes');
const keys = require('../../config/keys');
const { postReq } = require('../testHelpers');

const expect = chai.expect;

describe('POST /api/playlist/save/:spotifyId', () => {
  it('should save a playlist', async () => {
    const route = '/api/playlist/save';
    const spotifyId = 123;
    const data = {
      title: 'My Awesome Playlist',
      tracks: [{ name: 'Heller' }, { name: 'Ayo' }]
    };

    let user = new User({ spotifyId });
    await user.save();

    user = await User.findOne({ spotifyId });
    const oldPlaylistCount = user.playlists.length;

    const res = await postReq(route, spotifyId);

    user = await User.findOne({ spotifyId: 123 });
    const newPlaylistCount = user.playlists.length;

    expect(res).to.have.status(code.OK);
    expect(res.body.success).to.be.true;
    expect(newPlaylistCount).to.equal(oldPlaylistCount + 1);
  });
});
