const request = require('request');
const isNil = require('ramda/src/isNil');

const getUser = require('./getUser');
const keys = require('../../config/keys');
const { redirectToHash, isError } = require('./helpers');

module.exports = async (req, res, next) => {
  const code = req.query.code || null;
  const state = req.query.state || null;

  if (isNil(state)) {
    const params = { error: 'state_mismatch' };
    redirectToHash(res, params);
    return;
  }

  const authOptions = {
    url: 'https://accounts.spotify.com/api/token',
    form: {
      code,
      client_id: keys.spotifyClientId,
      client_secret: keys.spotifyClientSecret,
      redirect_uri: keys.redirectUri,
      grant_type: 'authorization_code'
    },
    json: true
  };

  request.post(authOptions, (error, response, body) => {
    if (isError(error, response)) {
      const params = { error: body.error_description };
      redirectToHash(res, params);
      return;
    }

    getUser(body, res);
  });
};
