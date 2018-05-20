const request = require('request');
const isNil = require('ramda/src/isNil');
const curry = require('ramda/src/curry');
const find = require('ramda/src/find');
const propEq = require('ramda/src/propEq');

const code = require('../../utils/statusCodes');
const User = require('../../models/User');
const updateCacheAdd = require('./utils/updateCacheAdd');
const addToFavorites = require('./utils/addToFavorites');

const isEqualTo = curry((trackData, targetUser) => trackData.id === targetUser.id);

const isDuplicate = (targetUser, trackData) => targetUser.favorites.some(isEqualTo(trackData));

const getCurrentTracks = (cache, query) => find(propEq('query', query), cache);

module.exports = async (req, res, next) => {
  const { spotifyId, trackData, query } = req.body.data;

  const targetUser = await User.findOne({ spotifyId });

  if (isNil(targetUser)) {
    const errMsg = 'Invalid Spotify ID.';
    next(errMsg);
    return;
  }

  updateCacheAdd(targetUser, query, trackData);

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

  res.send({ success: true, favorites, cache, current: current.tracks });
};
