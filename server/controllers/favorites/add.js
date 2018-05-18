const request = require('request');
const isNil = require('ramda/src/isNil');
const curry = require('ramda/src/curry');

const code = require('../../utils/statusCodes');
const User = require('../../models/User');

const isEqualTo = curry((spotifyData, targetUser) => spotifyData.id === targetUser.id);

const isDuplicate = (targetUser, spotifyData) => targetUser.favorites.some(isEqualTo(spotifyData));

module.exports = async (req, res, next) => {
  const { spotifyId, spotifyData } = req.body;

  const targetUser = await User.findOne({ spotifyId });

  if (isNil(targetUser)) {
    const errMsg = 'Invalid Spotify ID.';
    next(errMsg);
    return;
  }

  if (isDuplicate(targetUser, spotifyData)) {
    const errMsg = 'You have already favorited this track. You must really like it!';
    next(errMsg);
    return;
  }

  targetUser.favorites.push({ ...spotifyData });

  await targetUser.save();

  res.send({ success: true });
};
