const request = require('request');
const isNil = require('ramda/src/isNil');
const curry = require('ramda/src/curry');
const map = require('ramda/src/map');

const code = require('../../utils/statusCodes');
const User = require('../../models/User');

/*
=========== Update cache ===========
*/

const updateTargetTrackFavoriteProp = (favoritedTrack) => ({
  ...favoritedTrack,
  isFavorited: true
});

const isTargetTrack = (favoritedTrack, currTrack) => favoritedTrack.id === currTrack.id;

const getTargetTrack = (favoritedTrack) => (currTrack) =>
  isTargetTrack(favoritedTrack, currTrack)
    ? updateTargetTrackFavoriteProp(favoritedTrack)
    : currTrack;

const updateTargetTrack = (cachedPlaylist, trackData) => {
  const updatedTracks = map(getTargetTrack(trackData), cachedPlaylist.tracks);
  cachedPlaylist.tracks = updatedTracks;
  return cachedPlaylist;
};

const isTargetPlaylist = (cachedPlaylist, query) => cachedPlaylist.query === query;

const updateTargetPlaylist = (query) => (trackData) => (cachedPlaylist) =>
  isTargetPlaylist(cachedPlaylist, query)
    ? updateTargetTrack(cachedPlaylist, trackData)
    : cachedPlaylist;

const updateCache = (targetUser, query, trackData) => {
  map(updateTargetPlaylist(query)(trackData), targetUser.cache);
};

/*
=========== Add to favorites ===========
*/

const isEqualTo = curry((trackData, targetUser) => trackData.id === targetUser.id);

const isDuplicate = (targetUser, trackData) => targetUser.favorites.some(isEqualTo(trackData));

const addToFavorites = (targetUser, trackData) => {
  targetUser.favorites.push({ ...trackData, isFavorite: true });
};

/*
=========== Controller ===========
*/

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
