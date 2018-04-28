const axios = require('axios');
const map = require('ramda/src/map');
const curry = require('ramda/src/curry');
const flatten = require('ramda/src/flatten');
const sortBy = require('ramda/src/sortBy');
const path = require('ramda/src/path');
const uniqBy = require('ramda/src/uniqBy');

const User = require('../models/User');
const code = require('../utils/statusCodes');
const createToken = require('../utils/createToken');
const keys = require('../config/keys');

const redirectUri = 'http://localhost:8080/callback';

/*
===== Controllers =======
*/

const setHeaders = (token) => ({
  Authorization: `Bearer ${token}`
});

const spotifyRootUrl = 'https://api.spotify.com/v1/';
const spotifySearchUrl = `${spotifyRootUrl}search?limit=50&type=playlist&`;
const tracksParams = '?fields=items(track.id%2C%20track.name%2C%20track.popularity)';

const tracksRootUrl = 'https://api.spotify.com/v1/tracks/';

const getPlaylistTracks = curry((config, playlist) => {
  const tracksEndpoint = playlist.tracks.href;
  return axios
    .get(`${tracksEndpoint}${tracksParams}`, config)
    .then(({ data }) => data.items)
    .catch((err) => {});
});

const getTracks = curry((config, { track: { id } }) =>
  axios
    .get(`${tracksRootUrl}${id}`, config)
    .then(({ data }) => data)
    .catch((err) => {})
);

const byId = ({ track }) => track.id;

const search = async (req, res, next) => {
  const { query, token } = req.body;

  if (!query) {
    const errMsg = 'Query is invalid.';
    next(errMsg);
    return;
  }

  const url = `${spotifySearchUrl}q=${encodeURIComponent(query)}`;

  const config = {
    headers: setHeaders(token)
  };

  const results = await axios.get(url, config).catch((err) => {
    const errMsg = 'Token is invalid.';
    next(errMsg);
    return;
  });

  // if token is invalid, return from the function
  if (!results) return;

  const playlists = results.data.playlists.items;

  if (playlists.length === 0) {
    const errMsg = `No playlists found containing "${query}". Please try again.`;
    next(errMsg);
    return;
  }

  // const promises =

  const playlistTracks = await Promise.all(map(getPlaylistTracks(config), playlists));
  const uniqFlattened = uniqBy(byId, flatten(playlistTracks));
  const sortByPopularity = sortBy(path(['track', 'popularity']));
  const sorted = sortByPopularity(uniqFlattened);
  const top100 = sorted.slice(sorted.length - 100).reverse();

  const tracks = await Promise.all(map(getTracks(config), top100));
  const flattenedTracks = flatten(tracks);

  res.send(flattenedTracks);
};

module.exports = {
  search
};
