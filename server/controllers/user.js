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

const isError = (error, res) => error || res.statusCode !== code.OK;

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

  console.log({ refreshToken });

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
    access_token: accessToken,
    refresh_token: refreshToken
  };

  res.send(params);

  redirectToHash(res, params);
};

const refreshToken = async (req, res) => {
  var refresh_token = req.query.refresh_token;
  var authOptions = {
    url: 'https://accounts.spotify.com/api/token',
    headers: {
      Authorization:
        'Basic ' +
        new Buffer(keys.spotifyClientId + ':' + keys.spotifyClientSecret).toString('base64')
    },
    form: {
      grant_type: 'refresh_token',
      refresh_token: refresh_token
    },
    json: true
  };

  request.post(authOptions, function(error, response, body) {
    if (!error && response.statusCode === 200) {
      var access_token = body.access_token;
      res.send({
        access_token: access_token
      });
    }
  });
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
