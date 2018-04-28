const axios = require('axios');
const isEmpty = require('ramda/src/isEmpty');

const User = require('../models/User');
const createPlaylist = require('../utils/createPlaylist');
const code = require('../utils/statusCodes');
const keys = require('../config/keys');
const { setHeaders } = require('../utils/helpers');

/*
===== Endpoint Config =======
*/

const spotifyRootUrl = 'https://api.spotify.com/v1/';
const spotifySearchUrl = `${spotifyRootUrl}search?limit=50&type=playlist&`;

/*
===== Controllers =======
*/

const search = async (req, res, next) => {
  const { query, token } = req.body;

  if (!query) {
    const errMsg = 'Query is invalid.';
    next(errMsg);
    return;
  }

  const spotifySearchUrlWithQuery = `${spotifySearchUrl}q=${encodeURIComponent(query)}`;

  const config = {
    headers: setHeaders(token)
  };

  const results = await axios.get(spotifySearchUrlWithQuery, config).catch((err) => {
    const errMsg = 'Token is invalid.';
    next(errMsg);
    return;
  });

  // if token is invalid, return from the function
  if (!results) return;

  const playlists = results.data.playlists.items;

  if (isEmpty(playlists)) {
    const errMsg = `No playlists found containing "${query}". Please try again.`;
    next(errMsg);
    return;
  }

  const playlist = await createPlaylist(res, playlists, config);

  res.send(playlist);
};

module.exports = {
  search
};
