const map = require('ramda/src/map');

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

const updateCacheAdd = (targetUser, query, trackData) => {
  const updatedCache = map(updateTargetPlaylist(query)(trackData), targetUser.cache);
  targetUser.cache = updatedCache;
  return targetUser;
};

// TODO: better names
module.exports = updateCacheAdd;
