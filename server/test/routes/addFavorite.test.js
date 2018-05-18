const chai = require('chai');
const chaiHttp = require('chai-http');

const User = require('../../models/User');
const initTestSetup = require('../testSetup');
const code = require('../../utils/statusCodes');
const app = require('../../app');
const keys = require('../../config/keys');

chai.use(chaiHttp);
const expect = chai.expect;

describe('POST /api/favorite', () => {
  it.only('should add favorited track to DB', async () => {
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
});
