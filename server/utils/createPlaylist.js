const axios = require('axios');
const map = require('ramda/src/map');
const curry = require('ramda/src/curry');
const flatten = require('ramda/src/flatten');
const sortBy = require('ramda/src/sortBy');
const path = require('ramda/src/path');
const uniqBy = require('ramda/src/uniqBy');
const pipeP = require('ramda/src/pipeP');

/*
===== Endpoint Config =======
*/

const tracksRootUrl = 'https://api.spotify.com/v1/tracks/';
const tracksParams = '?fields=items(track.id%2C%20track.name%2C%20track.popularity)';

/*
===== AJAX requests =======
*/

const getTracks = curry((config, { track: { id } }) =>
  axios
    .get(`${tracksRootUrl}${id}`, config)
    .then(({ data }) => data)
    .catch((err) => {})
);

const getPlaylistTracks = curry((config, playlist) => {
  const tracksEndpoint = playlist.tracks.href;
  return axios
    .get(`${tracksEndpoint}${tracksParams}`, config)
    .then(({ data }) => data.items)
    .catch((err) => {});
});

/*
===== Helpers =======
*/

const getAllDataForTracks = curry((config, tracks) => Promise.all(map(getTracks(config), tracks)));

const getTop100Tracks = (tracks) => tracks.slice(tracks.length - 100).reverse();

const sortByPopularity = sortBy(path(['track', 'popularity']));

const byId = ({ track }) => track.id;

const uniqById = uniqBy(byId);

const mergePlaylistTracks = curry((config, playlists) =>
  Promise.all(map(getPlaylistTracks(config), playlists))
);

const createPlaylist = (res, playlists, config) =>
  pipeP(
    mergePlaylistTracks(config),
    flatten,
    uniqById,
    sortByPopularity,
    getTop100Tracks,
    getAllDataForTracks(config),
    flatten
  )(playlists);

module.exports = createPlaylist;
