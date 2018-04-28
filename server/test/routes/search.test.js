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

const now = () => new Date().getTime();

describe('POST /api/search', function() {
  this.timeout(15000);
  let validData, invalidQuery, invalidType, unknownQuery;

  before(async () => {
    // const route = '/api/refresh-token';
    // const data = { refreshToken: keys.spotifyRefreshToken, spotifyId: null };
    //
    // const res = await chai
    //   .request(app)
    //   .post(route)
    //   .send(data);
    //
    // const { accessToken } = res.body;
    // console.log(accessToken);

    const accessToken =
      'BQDEA1XrSODavH_liNiVwmz7tnzkohb4ydMnNc5qEG0vk9q5Wo6dDabZ7JzY8MYnz644UxeXU65CrO_y4VX35Kt36f0hrZKH5S4YfyYSsCVhp585_wtWWNw_ddIibtIGcnGq06l9TlJ8I47ZnpdcGImuRe7aM26vBQ';

    validData = { query: 'programming', token: accessToken };
    invalidToken = { query: 'programming', token: 'invalid' };
    invalidQuery = { query: '', token: accessToken };
    invalidType = { query: 'programming', token: accessToken };
    unknownQuery = { query: 'safdsafds', token: accessToken };
  });

  it('should return 50 playlists based on a search query', function(done) {
    this.timeout(15000);
    setTimeout(done, 15000);

    const route = `/api/search`;

    chai
      .request(app)
      .post(route)
      .send(validData)
      .then((res) => {
        expect(res).to.have.status(code.OK);
        expect(res.body).to.have.length(100);
        done();
      });
  });

  it('should return an error when given an invalid token', async () => {
    const errMsg = 'Token is invalid.';
    errReq(invalidToken, errMsg);
  });

  it('should return an error when given an invalid query', async () => {
    const errMsg = 'Query is invalid.';
    errReq(invalidQuery, errMsg);
  });

  it('should return an error when given an unknown query', async () => {
    const { query } = unknownQuery;
    const errMsg = `No playlists found containing "${query}". Please try again.`;
    errReq(unknownQuery, errMsg);
  });
});
