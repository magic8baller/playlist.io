const request = require('request');

const code = require('../../utils/statusCodes');
const User = require('../../models/User');
const deleteFromFavorites = require('./utils/deleteFromFavorites');
const updateCacheDelete = require('./utils/updateCacheDelete');

module.exports = async (req, res, next) => {
  const { spotifyId, query, trackData } = req.body;
  const targetId = trackData.id;

  const targetUser = await User.findOne({ spotifyId });

  deleteFromFavorites(targetId, targetUser);

  updateCacheDelete(targetUser, query, trackData);

  await targetUser.save();

  res.send({ success: true });
};
