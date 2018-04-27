const axios = require('axios');

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
const spotifySearchUrl = `${spotifyRootUrl}search?limit=50&`;

const search = async (req, res, next) => {
  const { query, type, token } = req.body;

  if (!query) {
    const errMsg = 'Query is invalid.';
    next(errMsg);
    return;
  }

  if (!type) {
    const errMsg = 'Type is invalid.';
    next(errMsg);
    return;
  }

  const url = `${spotifySearchUrl}q=${query}&type=${type}`;

  const config = {
    headers: setHeaders(token)
  };

  const results = await axios.get(url, config).catch((err) => {
    const errMsg = 'Token is invalid.';
    next(errMsg);
    return;
  });

  if (!results) return;

  const { data } = results;

  if (data.playlists.items.length === 0) {
    const errMsg = `No playlists found containing "${query}". Please try again.`;
    next(errMsg);
    return;
  }

  res.send(data);
};

module.exports = {
  search
};
