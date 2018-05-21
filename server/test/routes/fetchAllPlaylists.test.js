const chai = require('chai');
const mongoose = require('mongoose');

const User = require('../../models/User');
const initTestSetup = require('../testSetup');
const code = require('../../utils/statusCodes');
const keys = require('../../config/keys');
const { postReq, getReq } = require('../testHelpers');

const expect = chai.expect;

describe('GET /api/playlists/all/:spotifyId', () => {
  beforeEach((done) => {
    const users = mongoose.connection.collections.users;
    users.drop(() => {
      done();
    });
  });

  it('should fetch all saved and cached playlists', async () => {
    const savePlaylistRoute = '/api/playlist/save';
    const cachePlaylistRoute = '/api/playlist/cache';
    const fetchPlaylistsRoute = '/api/playlists/all';

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

    await Promise.all([
      postReq(savePlaylistRoute, spotifyId, savePlaylistData),
      postReq(cachePlaylistRoute, spotifyId, cachePlaylistData)
    ]);

    const res = await getReq(fetchPlaylistsRoute, spotifyId);

    expect(res).to.have.status(code.OK);
    expect(res.body.playlists[0].title).to.equal(savePlaylistData.title);
    expect(res.body.playlists[0].tracks[0].name).to.equal(savePlaylistData.tracks[0].name);
    expect(res.body.playlists[0].tracks[1].name).to.equal(savePlaylistData.tracks[1].name);
    expect(res.body.cache).to.have.length(1);
    expect(res.body.cache[0].tracks[0].name).to.equal(cachePlaylistData.playlist[0].name);
  });

  it('should return an error message when no playlists have been saved but still return cached playlists', async () => {
    const spotifyId = 123;

    const fetchPlaylistsRoute = '/api/playlists/all';
    const cachePlaylistRoute = '/api/playlist/cache';

    const cachePlaylistData = {
      query: 'programming',
      playlist: [{ name: 'Yeehaw' }, { name: 'Howdy' }]
    };

    const user = new User({ spotifyId });
    await user.save();

    await postReq(cachePlaylistRoute, spotifyId, cachePlaylistData);

    const res = await getReq(fetchPlaylistsRoute, spotifyId);

    expect(res).to.have.status(code.OK);
    expect(res.body.playlists.error.message).to.equal('No playlists have been saved.');
    expect(res.body.cache).to.have.length(1);
  });
});
