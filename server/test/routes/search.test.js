const chai = require('chai');
const chaiHttp = require('chai-http');

const User = require('../../models/User');
const initTestSetup = require('../testSetup');
const code = require('../../utils/statusCodes');
const app = require('../../app');
const keys = require('../../config/keys');

chai.use(chaiHttp);
const expect = chai.expect;

const route = '/api/search';

const errReq = async (data, errorMsg) => {
  const res = await chai
    .request(app)
    .post(route)
    .send(data);

  expect(res).to.have.status(code.USER_ERROR);
  expect(res.body.error).to.equal(errorMsg);
};

describe('POST /api/search', () => {
  let validData, invalidQuery, invalidType, unknownQuery;

  before(async () => {
    const route = '/api/refresh-token';
    const data = { refreshToken: keys.spotifyRefreshToken, spotifyId: null };

    const res = await chai
      .request(app)
      .post(route)
      .send(data);

    const { accessToken } = res.body;

    validData = { query: 'programming', type: 'playlist', token: accessToken };
    invalidToken = { query: 'programming', type: 'playlist', token: 'invalid' };
    invalidQuery = { query: '', type: 'playlist', token: accessToken };
    invalidType = { query: 'programming', type: '', token: accessToken };
    unknownQuery = { query: 'safdsafds', type: 'playlist', token: accessToken };
  });

  it('should return 50 playlists based on a search query', async () => {
    const route = `/api/search`;

    const res = await chai
      .request(app)
      .post(route)
      .send(validData);

    expect(res).to.have.status(code.OK);
    expect(res.body).to.have.property('playlists');
    expect(res.body.playlists.items).to.have.length(50);
    expect(res.body.playlists.items[0]).to.have.property('tracks');
    expect(res.body.playlists.items[0]).to.have.property('id');
    expect(res.body.playlists.items[0]).to.have.property('name');
  });

  it('should return an error when given an invalid token', async () => {
    const errMsg = 'Token is invalid.';
    errReq(invalidToken, errMsg);
  });

  it('should return an error when given an invalid query', async () => {
    const errMsg = 'Query is invalid.';
    errReq(invalidQuery, errMsg);
  });

  it('should return an error when given an invalid type', async () => {
    const errMsg = 'Type is invalid.';
    errReq(invalidType, errMsg);
  });

  it('should return an error when given an unknown query', async () => {
    const { query } = unknownQuery;
    const errMsg = `No playlists found containing "${query}". Please try again.`;
    errReq(unknownQuery, errMsg);
  });
});
