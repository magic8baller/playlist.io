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

const search = async (req, res) => {
  const { query, type } = req.params;

  const url = `${spotifySearchUrl}q=${query}&type=${type}`;

  const token =
    'BQBMKEjNTBMBLMcwX09-CFQ94vsUPwB7-QcIzwTq-5k2eu_MGu13esddJX5UwbvKd6gD4jp_1HcrgC0Z5kwKn5u-DHYxhvbfXNC7z_JJonUS2a2SICifpE6vB7rtlakpCdlUj4Y0ofrkErCF3khgbSfjzNOE7BcaeQ';

  const config = {
    headers: setHeaders(token)
  };

  const { data } = await axios.get(url, config).catch((err) => {
    // console.log(err);
  });

  res.send(data);
};

module.exports = {
  search
};
