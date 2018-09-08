const randomString = require('randomstring');

const keys = require('../../config/keys');
const { redirectToSpotifyAuth } = require('./helpers');

module.exports = async (req, res) => {
  const chars = 16;
  const state = randomString.generate(chars);

  const params = {
    response_type: 'code',
    scope:
      'user-read-private user-read-email playlist-modify-public playlist-modify-private streaming user-read-birthdate user-read-email user-read-private',
    client_id: keys.spotifyClientId,
    redirect_uri: keys.redirectUri,
    state
  };

  redirectToSpotifyAuth(res, params);
};
