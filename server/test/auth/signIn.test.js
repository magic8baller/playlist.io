const chai = require('chai');
const chaiHttp = require('chai-http');

const User = require('../../models/User');
const initTestSetup = require('../testSetup');
const code = require('../../utils/statusCodes');
const app = require('../../app');

initTestSetup();

chai.use(chaiHttp);
const expect = chai.expect;

describe('GET /api/authorize', () => {
  xit('should allow a user to authorize access to their Spotify account', async () => {
    const route = '/api/authorize';
    const res = await chai.request(app).get(route);

    expect(res).to.have.status(code.OK);
    expect(res.redirects).to.have.length(1);
    expect(res.redirects[0]).to.be.a('string');
  });
});
