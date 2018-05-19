const request = require('request');

const code = require('../../utils/statusCodes');
const User = require('../../models/User');
const deleteFromFavorites = require('./utils/deleteFromFavorites');

module.exports = async (req, res, next) => {
  const { spotifyId, targetId } = req.body;

  const targetUser = await User.findOne({ spotifyId });

  deleteFromFavorites(targetId, targetUser);

  await targetUser.save();

  res.send({ success: true });
};
