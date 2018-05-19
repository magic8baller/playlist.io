const request = require('request');
const isNil = require('ramda/src/isNil');
const curry = require('ramda/src/curry');

const code = require('../../utils/statusCodes');
const User = require('../../models/User');
const updateCache = require('./utils/updateCache');
const addToFavorites = require('./utils/addToFavorites');

const isEqualTo = curry((trackData, targetUser) => trackData.id === targetUser.id);

const isDuplicate = (targetUser, trackData) => targetUser.favorites.some(isEqualTo(trackData));

module.exports = async (req, res, next) => {
  const { spotifyId, trackData, query } = req.body;

  let targetUser = await User.findOne({ spotifyId });

  if (isNil(targetUser)) {
    const errMsg = 'Invalid Spotify ID.';
    next(errMsg);
    return;
  }

  updateCache(targetUser, query, trackData);

  if (isDuplicate(targetUser, trackData)) {
    await targetUser.save();
    const errMsg = 'You have already favorited this track. You must really like it!';
    next(errMsg);
    return;
  }

  addToFavorites(targetUser, trackData);

  await targetUser.save();

  res.send({ success: true });
};
