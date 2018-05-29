const chai = require('chai');
const chaiHttp = require('chai-http');
const mongoose = require('mongoose');

const User = require('../../models/User');
const initTestSetup = require('../testSetup');
const code = require('../../utils/statusCodes');
const keys = require('../../config/keys');
const { getReq, postReq } = require('../testHelpers');

chai.use(chaiHttp);
const expect = chai.expect;

describe.only('GET /api/favorite/:spotifyId', () => {
  beforeEach((done) => {
    const users = mongoose.connection.collections.users;
    users.drop(() => {
      done();
    });
  });

  it('should return all favorites', async () => {
    const addFavoriteRoute = '/api/favorite';
    const fetchFavoritesRoute = '/api/favorites';
    const spotifyId = 123;
    const reqPayload = {
      data: {
        trackData: {
          id: '1',
          name: 'Awesome New Song',
          album: { name: 'Awesome Album' },
          artists: [{ name: 'Kesha' }]
        }
      }
    };

    let user = new User({ spotifyId });
    await user.save();

    await postReq(addFavoriteRoute, spotifyId, reqPayload);

    const res = await getReq(fetchFavoritesRoute, spotifyId);

    expect(res).to.have.status(code.OK);
    expect(res.body.success).to.be.true;
    expect(res.body.favorites.length).to.equal(1);
    expect(res.body.favorites[0].name).to.equal('Awesome New Song');
  });

  it('should return an error message when no playlists have been saved', async () => {
    const route = '/api/favorites';
    const spotifyId = 123;

    let user = new User({ spotifyId });
    await user.save();

    const res = await getReq(route, spotifyId);

    expect(res).to.have.status(code.OK);
    expect(res.body.error).to.be.true;
    expect(res.body.favorites.error.message).to.equal('No favorites have been saved.');
  });
});
