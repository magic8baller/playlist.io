const request = require('request');
const isNil = require('ramda/src/isNil');
const curry = require('ramda/src/curry');

const code = require('../../utils/statusCodes');
const User = require('../../models/User');
const addFavoriteToCache = require('./utils/addFavoriteToCache');
const addToFavorites = require('./utils/addToFavorites');
const getCurrentTracks = require('./utils/getCurrentTracks');

const isEqualTo = curry((trackData, targetUser) => trackData.id === targetUser.id);

const isDuplicate = (targetUser, trackData) => targetUser.favorites.some(isEqualTo(trackData));

module.exports = async (req, res, next) => {
  const { spotifyId } = req.params;
  const { trackData, query } = req.body.data;

  const targetUser = await User.findOne({ spotifyId });

  if (isNil(targetUser)) {
    const errMsg = 'Invalid Spotify ID.';
    next(errMsg);
    return;
  }

  addFavoriteToCache(targetUser, query, trackData);

  if (isDuplicate(targetUser, trackData)) {
    await targetUser.save();
    const errMsg = 'You have already favorited this track. You must really like it!';
    next(errMsg);
    return;
  }

  addToFavorites(targetUser, trackData);

  await targetUser.save();

  const { favorites, cache } = targetUser;
  const current = getCurrentTracks(cache, query);

  // if current playlist is empty, return an empty object -- useful for testing
  res.send({ success: true, favorites, cache, current: current ? current.tracks : {} });
};
