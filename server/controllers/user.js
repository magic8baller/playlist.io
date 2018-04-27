const randomString = require('randomstring');
const queryString = require('querystring');
const cookieParser = require('cookie-parser');
const request = require('request');
const isNil = require('ramda/src/isNil');

const User = require('../models/User');
const code = require('../utils/statusCodes');
const createToken = require('../utils/createToken');
const keys = require('../config/keys');

const redirectUri = 'http://localhost:8080/callback';
const stateKey = 'spotify_auth_state';

/*
===== Helpers =======
*/

const redirect = (path) => (res, params) =>
  res.redirect(path + queryString.stringify({ ...params }));

const redirectToHash = redirect('/#');

const redirectToSpotifyAuth = redirect('https://accounts.spotify.com/authorize?');

const isError = (error, response) => error || response.statusCode !== code.OK;

/*
===== Controllers =======
*/

const greeting = (req, res) => {
  res.send({ hi: 'there' });
};

const authorize = async (req, res, next) => {
  const chars = 16;
  const state = randomString.generate(chars);

  const params = {
    response_type: 'code',
    scope: 'user-read-private user-read-email',
    client_id: keys.spotifyClientId,
    redirect_uri: redirectUri,
    state
  };

  redirectToSpotifyAuth(res, params);
};

const signIn = async (req, res, next) => {
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
      redirect_uri: redirectUri,
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

const getUser = (body, res) => {
  const accessToken = body.access_token,
    refreshToken = body.refresh_token;

  process.env.DEV_SPOTIFY_ACCESS_TOKEN = accessToken;

  const options = {
    url: 'https://api.spotify.com/v1/me',
    headers: { Authorization: 'Bearer ' + accessToken },
    json: true
  };

  // use the access token to access the Spotify Web API
  request.get(options, (error, response, body) => {
    console.log(body);
  });

  // we can also pass the token to the browser to make requests from there
  const params = {
    accessToken,
    refreshToken
  };

  res.send(params);

  // redirectToHash(res, params);
};

const refreshToken = async (req, res) => {
  res.send({});
};

const error = (req, res) => {
  res.send({ error: req.query.error });
};

module.exports = {
  greeting,
  authorize,
  signIn,
  refreshToken,
  error
};
