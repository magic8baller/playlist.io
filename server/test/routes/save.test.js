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
  xit('should save a playlist', async () => {
    const route = '/api/playlist';
    const data = {
      spotifyId: 123,
      title: 'My Awesome Playlist',
      tracks: [{ name: 'Heller' }, { name: 'Ayo' }]
    };

    const user = new User({ spotifyId: 123, playlists: [] });
    await user.save();

    // const oldCount = await User.find({});

    // console.log(oldCount);

    const res = await chai
      .request(app)
      .post(route)
      .send(data);

    // const newCount = await User.count({});

    expect(res).to.have.status(code.OK);
    expect(res.body).to.include(data);
    expect(newCount).to.equal(oldCount + 1);
  });
});
