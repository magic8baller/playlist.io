const request = require('request');

const keys = require('../../config/keys');
const { isError } = require('./helpers');

module.exports = async (req, res, next) => {
  const refreshToken = req.body.refresh_token;

  const authOptions = {
    url: 'https://accounts.spotify.com/api/token',
    form: {
      client_id: keys.spotifyClientId,
      client_secret: keys.spotifyClientSecret,
      grant_type: 'refresh_token',
      refresh_token: refreshToken
    },
    json: true
  };

  request.post(authOptions, (error, response, body) => {
    if (isError(error, response)) {
      const errMsg = body.error_description;
      next(errMsg);
      return;
    }

    res.send(body);
  });
};
