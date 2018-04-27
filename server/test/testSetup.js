// Access to env variables
require('dotenv').config();

const mongoose = require('mongoose');
const chai = require('chai');
const chaiHttp = require('chai-http');

const app = require('../app');
const keys = require('../config/keys');

chai.use(chaiHttp);
const expect = chai.expect;

module.exports = () => {
  let users;

  before((done) => {
    mongoose.connect('mongodb://localhost/playlists-io-test');
    mongoose.connection.once('open', () => done()).on('error', (error) => {
      console.warn('Warning', error);
    });

    // users = mongoose.connection.collections.users;
    // users.drop().catch(() => done());
  });

  before(async () => {
    const route = '/api/refresh-token';
    const data = { refreshToken: keys.spotifyRefreshToken, spotifyId: null };

    const res = await chai
      .request(app)
      .post(route)
      .send(data);

    const { accessToken } = res.body;
    process.env.SPOTIFY_ACCESS_TOKEN = accessToken;
    console.log(process.env.SPOTIFY_ACCESS_TOKEN);
  });

  after((done) => {
    users = mongoose.connection.collections.users;
    users.drop().catch(() => done());
  });
};
