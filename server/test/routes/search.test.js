const chai = require('chai');
const chaiHttp = require('chai-http');

const User = require('../../models/User');
const initTestSetup = require('../testSetup');
const code = require('../../utils/statusCodes');
const app = require('../../app');

// initTestSetup();

chai.use(chaiHttp);
const expect = chai.expect;

describe('GET /api/search', () => {
  it.only('should return 50 playlists based on a search query', async () => {
    const query = 'programming';
    const type = 'playlist';
    const route = `/api/search/${query}/${type}`;

    const res = await chai.request(app).get(route);

    expect(res).to.have.status(code.OK);
    expect(res.body).to.have.property('playlists');
    expect(res.body.playlists.items).to.have.length(50);
    expect(res.body.playlists.items[0]).to.have.property('tracks');
    expect(res.body.playlists.items[0]).to.have.property('id');
    expect(res.body.playlists.items[0]).to.have.property('name');
  });
});
