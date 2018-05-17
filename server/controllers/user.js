const randomString = require('randomstring');
const queryString = require('querystring');
const request = require('request');
const isNil = require('ramda/src/isNil');

const User = require('../models/User');
const code = require('../utils/statusCodes');
const keys = require('../config/keys');
const to = require('../utils/to');

/*
===== Helpers =======
*/

const redirect = (path) => (res, params) =>
  res.redirect(path + queryString.stringify({ ...params }));

const redirectToHash = redirect('/#');

const redirectToSpotifyAuth = redirect('https://accounts.spotify.com/authorize?');

const isError = (error, res) => error || res.statusCode !== code.OK;

const updateUser = async (spotifyId, accessToken) => {
  const [updateErr, updatedUser] = await to(User.findOneAndUpdate({ spotifyId }, { accessToken }));

  if (updateErr) console.log(updateErr);
};

const createUser = async (userData) => {
  const [createErr, createdUser] = await to(User.create(userData));

  if (createErr) console.log(createErr);
};

/*
===== Controllers =======
*/

const authorize = async (req, res, next) => {
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
      redirect_uri: keys.redirectUri,
      grant_type: 'authorization_code'
    },
    json: true
  };

  request.post(authOptions, (error, response, body) => {
    if (isError(error, response)) {
      console.log({ body, error });
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
    const isPremium = body.product === 'premium';

    const userData = {
      spotifyId,
      name,
      accessToken,
      refreshToken,
      isPremium
    };

    const [userErr, userExists] = await to(User.findOne({ spotifyId }));

    if (userErr) {
      console.log(userErr);
      return;
    }

    userExists ? await updateUser(spotifyId, accessToken) : await createUser(userData);

    res.redirect(
      keys.frontendDomain +
        queryString.stringify({
          accessToken,
          refreshToken,
          spotifyId,
          isPremium,
          name
        })
    );
  });
};

module.exports = {
  authorize,
  signIn
};
