const randomString = require('randomstring');
const queryString = require('querystring');
const cookieParser = require('cookie-parser');

const User = require('../models/User');
const code = require('../utils/statusCodes');
const createToken = require('../utils/createToken');
const keys = require('../config/keys');

const INVALID_CREDENTIALS = 'You must provide a username and password';
const INVALID_USERNAME = 'Username already exists. Please try again.';
const redirectUri = 'http://localhost:8080/callback';

const stateKey = 'spotify_auth_state';

const greeting = (req, res) => {
  res.send({ hi: 'there' });
};

const authorize = async (req, res, next) => {
  const chars = 16;
  const state = randomString.generate(chars);

  res.cookie(stateKey, state);

  const scope = 'user-read-private user-read-email';

  res.redirect(
    'https://accounts.spotify.com/authorize?' +
      queryString.stringify({
        response_type: 'code',
        client_id: keys.spotifyClientId,
        redirect_uri: redirectUri,
        scope,
        state
      })
  );
};

const signIn = async (req, res, next) => {
  res.send({});
};

module.exports = {
  greeting,
  authorize,
  signIn
};
