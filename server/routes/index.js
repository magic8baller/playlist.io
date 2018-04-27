const express = require('express');
const passport = require('passport');

const UserController = require('../controllers/user');
const PlaylistController = require('../controllers/playlist');

module.exports = (app) => {
  // User
  app.get('/', UserController.greeting);
  app.get('/api/authorize', UserController.authorize);
  app.get('/api/error/:errorMsg', UserController.error);
  app.get('/callback', UserController.signIn);
  app.get('/api/refresh', UserController.refreshToken);

  // Playlist
  app.get('/api/search/:query/:type', PlaylistController.search);
};
