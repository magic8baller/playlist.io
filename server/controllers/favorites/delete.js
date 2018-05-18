const request = require('request');
const filter = require('ramda/src/filter');
const curry = require('ramda/src/curry');

const code = require('../../utils/statusCodes');
const User = require('../../models/User');

const isTargetId = curry((targetId, { id }) => id !== targetId);

module.exports = async (req, res, next) => {
  const { spotifyId, targetId } = req.body;

  const targetUser = await User.findOne({ spotifyId });

  const updatedFavorites = filter(isTargetId(targetId), targetUser.favorites);

  targetUser.favorites = updatedFavorites;

  await targetUser.save();

  res.send({ success: true });
};
