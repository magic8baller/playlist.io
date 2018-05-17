const request = require('request');
const queryString = require('querystring');

const User = require('../../models/User');
const to = require('../../utils/to');
const keys = require('../../config/keys');
const { updateUser, createUser } = require('./helpers');

module.exports = (body, res) => {
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
