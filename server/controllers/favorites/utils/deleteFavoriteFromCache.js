const map = require('ramda/src/map');

const updateTargetTrackFavoriteProp = (targetTrack) => ({
  ...targetTrack,
  isFavorited: false
});

const isTargetTrack = (targetTrack, currTrack) => targetTrack.id === currTrack.id;

const getTargetTrack = (targetTrack) => (currTrack) =>
  isTargetTrack(targetTrack, currTrack) ? updateTargetTrackFavoriteProp(targetTrack) : currTrack;

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

const deleteFavoriteFromCache = (targetUser, query, trackData) => {
  map(updateTargetPlaylist(query)(trackData), targetUser.cache);
};

// TODO: better name
module.exports = deleteFavoriteFromCache;
