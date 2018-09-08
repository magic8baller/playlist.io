const chai = require('chai');
const mongoose = require('mongoose');

const User = require('../../models/User');
const initTestSetup = require('../testSetup');
const code = require('../../utils/statusCodes');
const keys = require('../../config/keys');
const { postReq, getReq } = require('../testHelpers');

const expect = chai.expect;

describe('GET /api/playlists/saved/:spotifyId', () => {
  beforeEach((done) => {
    const users = mongoose.connection.collections.users;
    users.drop(() => {
      done();
    });
  });

  it('should fetch all saved playlists', async () => {
    const savePlaylistRoute = '/api/playlist/save';
    const cachePlaylistRoute = '/api/playlist/cache';
    const fetchSavedPlaylistsRoute = '/api/playlists/saved';

    const spotifyId = 123;

    const savePlaylistData = {
      title: 'My Awesome Playlist',
      tracks: [{ name: 'Heller' }, { name: 'Ayo' }]
    };

    const cachePlaylistData = {
      query: 'programming',
      playlist: [{ name: 'Yeehaw' }, { name: 'Howdy' }]
    };

    const user = new User({ spotifyId });
    await user.save();

    await postReq(savePlaylistRoute, spotifyId, savePlaylistData);

    const res = await getReq(fetchSavedPlaylistsRoute, spotifyId);

    expect(res).to.have.status(code.OK);
    expect(res.body.playlists[0].title).to.equal(savePlaylistData.title);
    expect(res.body.playlists[0].tracks[0].name).to.equal(savePlaylistData.tracks[0].name);
    expect(res.body.playlists[0].tracks[1].name).to.equal(savePlaylistData.tracks[1].name);
  });

  it('should return an error message when no playlists have been saved', async () => {
    const spotifyId = 123;
    const fetchPlaylistsRoute = '/api/playlists/saved';

    const user = new User({ spotifyId });
    await user.save();

    const res = await getReq(fetchPlaylistsRoute, spotifyId);

    expect(res).to.have.status(code.USER_ERROR);
    expect(res.body.error.code).to.equal(code.USER_ERROR);
    expect(res.body.error.message).to.equal('No playlists have been saved.');
  });

  it('should return an error message when given an invalid spotifyId', async () => {
    const spotifyId = 123;
    const fetchPlaylistsRoute = '/api/playlists/saved';

    const res = await getReq(fetchPlaylistsRoute, spotifyId);

    expect(res).to.have.status(code.USER_ERROR);
    expect(res.body.error.code).to.equal(code.USER_ERROR);
    expect(res.body.error.message).to.equal('Invalid Spotify ID');
  });
});
