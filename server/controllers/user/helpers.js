const queryString = require('querystring');

const User = require('../../models/User');
const code = require('../../utils/statusCodes');
const to = require('../../utils/to');

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

module.exports = {
  redirectToHash,
  redirectToSpotifyAuth,
  updateUser,
  createUser,
  isError
};
