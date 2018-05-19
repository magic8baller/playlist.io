const code = require('../../utils/statusCodes');
const User = require('../../models/User');

const isEmpty = (playlists) => !playlists.length;

module.exports = async (req, res, next) => {
  res.send({});
};
