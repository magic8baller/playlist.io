const chai = require('chai');
const chaiHttp = require('chai-http');

const User = require('../../models/User');
const initTestSetup = require('../testSetup');
const code = require('../../utils/statusCodes');
const app = require('../../app');

// initTestSetup();

chai.use(chaiHttp);
const expect = chai.expect;

const credentials = {
  firstName: 'Bob',
  username: 'bob',
  password: 'qoeru1934p'
};
const noUsername = { password: credentials.password };
const noPassword = { username: credentials.username };
const emptyPassword = { username: credentials.username, password: '' };
const wrongUsername = { username: 'jill', password: credentials.password };
const wrongPassword = { username: credentials.username, password: 'jlqer' };
const seededUser = { username: 'samantha', password: '314dsfadkfeaf' };

describe('GET /api/signin', () => {
  it('should allow a user to authorize access to their Spotify account', async () => {
    const route = '/api/authorize';
    const res = await chai.request(app).get(route);

    expect(res).to.have.status(code.OK);
    expect(res.body.code).to.be.a('number');
    expect(res.body.state).to.be.a('string');
  });
});
