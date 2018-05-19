const request = require('request');
const isNil = require('ramda/src/isNil');
const curry = require('ramda/src/curry');

const code = require('../../utils/statusCodes');
const User = require('../../models/User');

const isEqualTo = curry((spotifyData, targetUser) => spotifyData.id === targetUser.id);

const isDuplicate = (targetUser, spotifyData) => targetUser.favorites.some(isEqualTo(spotifyData));

const saveToCache = (targetUser, query, spotifyData) => {
  const newCachedPlaylist = { query, tracks: { ...spotifyData, isFavorite: true } };
  targetUser.cache.push({ ...newCachedPlaylist });
};

const saveToFavorites = (targetUser, spotifyData) => {
  targetUser.favorites.push({ ...spotifyData, isFavorite: true });
};

module.exports = async (req, res, next) => {
  const { spotifyId, spotifyData, query } = req.body;

  let targetUser = await User.findOne({ spotifyId });

  if (isNil(targetUser)) {
    const errMsg = 'Invalid Spotify ID.';
    next(errMsg);
    return;
  }

  saveToCache(targetUser, query, spotifyData);

  if (isDuplicate(targetUser, spotifyData)) {
    await targetUser.save();
    const errMsg = 'You have already favorited this track. You must really like it!';
    next(errMsg);
    return;
  }

  saveToFavorites(targetUser, spotifyData);

  await targetUser.save();

  res.send({ success: true });
};
