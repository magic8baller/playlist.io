const randomString = require('randomstring');
const queryString = require('querystring');
const cookieParser = require('cookie-parser');
const request = require('request');
const isNil = require('ramda/src/isNil');

const User = require('../models/User');
const code = require('../utils/statusCodes');
const keys = require('../config/keys');
const to = require('../utils/to');

const redirectUri =
  process.env.NODE_ENV === 'production'
    ? 'https://playlist-io-backend.herokuapp.com/callback'
    : 'http://localhost:8080/callback';

const frontendDomain =
  process.env.NODE_ENV === 'production'
    ? 'https://playlist-io.netlify.com/?'
    : 'http://localhost:3000/?';

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
    scope:
      'user-read-private user-read-email playlist-modify-public playlist-modify-private streaming user-read-birthdate user-read-email user-read-private',
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

  const options = {
    url: 'https://api.spotify.com/v1/me',
    headers: { Authorization: 'Bearer ' + accessToken },
    json: true
  };

  // use the access token to access the Spotify Web API
  request.get(options, async (error, response, body) => {
    const spotifyId = body.id;
    const name = body.display_name;

    const userData = {
      spotifyId,
      name,
      accessToken,
      refreshToken
    };

    const [userErr, user] = await to(User.findOne({ spotifyId }));

    // if user exists, update their access token
    // otherwise, create a new user
    user
      ? await User.findOneAndUpdate({ spotifyId }, { accessToken })
      : await User.create(userData);

    res.redirect(
      'http://localhost:3000/?' +
        queryString.stringify({
          accessToken,
          refreshToken,
          spotifyId,
          name
        })
    );
  });
};

const refreshToken = (req, res) => {
  const { refreshToken, spotifyId } = req.body;
  const authOptions = {
    url: 'https://accounts.spotify.com/api/token',
    form: {
      grant_type: 'refresh_token',
      refresh_token: refreshToken,
      client_id: keys.spotifyClientId,
      client_secret: keys.spotifyClientSecret
    },
    json: true
  };

  request.post(authOptions, async (error, response, body) => {
    if (!error && response.statusCode === 200) {
      const accessToken = body.access_token;

      // test does not have spotify id so don't update db when testing
      spotifyId ? await User.findOneAndUpdate({ spotifyId }, { accessToken }) : '';
      res.send({ accessToken });
      return;
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
