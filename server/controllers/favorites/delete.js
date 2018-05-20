const request = require('request');

const code = require('../../utils/statusCodes');
const User = require('../../models/User');
const deleteFromFavorites = require('./utils/deleteFromFavorites');
const updateCacheDelete = require('./utils/updateCacheDelete');

module.exports = async (req, res, next) => {
  const { spotifyId, query, trackData } = req.query;
  const parsedTrackData = JSON.parse(trackData);

  const targetUser = await User.findOne({ spotifyId });

  deleteFromFavorites(parsedTrackData, targetUser);

  updateCacheDelete(targetUser, query, parsedTrackData);

  await targetUser.save();

  res.send({ success: true });
};
