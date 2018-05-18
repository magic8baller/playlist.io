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

describe('DELETE /api/favorite', () => {
  before((done) => {
    users = mongoose.connection.collections.users;
    users.drop(() => {
      done();
    });
  });

  it('should delete favorited track from DB', async () => {
    const route = '/api/favorite';
    const addFavoriteData = {
      spotifyId: 123,
      spotifyData: {
        id: '231432',
        name: 'Awesome New Song',
        album: { name: 'Awesome Album' },
        artists: [{ name: 'Kesha' }]
      }
    };

    const deleteFavoriteData = { spotifyId: 123, targetId: '231432' };

    let user = new User({ spotifyId: 123, favorites: [] });
    await user.save();

    await chai
      .request(app)
      .post(route)
      .send(addFavoriteData);

    user = await User.findOne({ spotifyId: 123 });
    const oldFavoritesCount = user.favorites.length;

    const res = await chai
      .request(app)
      .delete(route)
      .send(deleteFavoriteData);

    user = await User.findOne({ spotifyId: 123 });
    const newFavoritesCount = user.favorites.length;

    expect(res).to.have.status(code.OK);
    expect(res.body.success).to.be.true;
    expect(newFavoritesCount).to.equal(oldFavoritesCount - 1);
  });
});
