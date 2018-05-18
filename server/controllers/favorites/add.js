const request = require('request');
const isNil = require('ramda/src/isNil');

const code = require('../../utils/statusCodes');
const User = require('../../models/User');

module.exports = async (req, res, next) => {
  const { spotifyId, spotifyData } = req.body;

  const targetUser = await User.findOne({ spotifyId });

  if (isNil(targetUser)) {
    const errMsg = 'Invalid Spotify ID.';
    next(errMsg);
    return;
  }

  targetUser.favorites.push({ ...spotifyData });

  await targetUser.save();

  res.send({ success: true });
};
