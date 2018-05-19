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

describe('POST /api/playlists', () => {
  beforeEach((done) => {
    const users = mongoose.connection.collections.users;
    users.drop(() => {
      done();
    });
  });

  it('should fetch all saved playlists', async () => {
    const savePlaylistRoute = '/api/playlist/save';
    const playlistData = {
      spotifyId: 123,
      title: 'My Awesome Playlist',
      tracks: [{ name: 'Heller' }, { name: 'Ayo' }]
    };

    const user = new User({ spotifyId: 123, playlists: [] });
    await user.save();

    await chai
      .request(app)
      .post(savePlaylistRoute)
      .send(playlistData);

    const fetchPlaylistsRoute = '/api/playlists';
    const userData = { spotifyId: 123 };

    const res = await chai
      .request(app)
      .post(fetchPlaylistsRoute)
      .send(userData);

    expect(res).to.have.status(code.OK);
    expect(res.body.playlists[0].title).to.equal(playlistData.title);
    expect(res.body.playlists[0].tracks[0].name).to.equal(playlistData.tracks[0].name);
    expect(res.body.playlists[0].tracks[1].name).to.equal(playlistData.tracks[1].name);
  });

  it('should return an error message when no playlists have been saved', async () => {
    const user = new User({ spotifyId: 123, playlists: [] });
    await user.save();

    const fetchPlaylistsRoute = '/api/playlists';
    const userData = { spotifyId: 123 };

    const res = await chai
      .request(app)
      .post(fetchPlaylistsRoute)
      .send(userData);

    expect(res).to.have.status(code.USER_ERROR);
    expect(res.body.error.code).to.equal(code.USER_ERROR);
    expect(res.body.error.message).to.equal('No playlists have been saved.');
  });

  it('should return an error message when given an invalid spotifyId', async () => {
    const fetchPlaylistsRoute = '/api/playlists';
    const userData = { spotifyId: 0 };

    const res = await chai
      .request(app)
      .post(fetchPlaylistsRoute)
      .send(userData);

    expect(res).to.have.status(code.USER_ERROR);
    expect(res.body.error.code).to.equal(code.USER_ERROR);
    expect(res.body.error.message).to.equal('Invalid Spotify ID');
  });
});
