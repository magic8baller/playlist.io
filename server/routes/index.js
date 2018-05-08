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
  app.post('/api/refresh-token', UserController.refreshToken);

  // Playlist
  app.post('/api/playlist', PlaylistController.save);
  app.post('/api/playlists', PlaylistController.fetch);
};
