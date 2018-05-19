const express = require('express');
const passport = require('passport');

const UserController = require('../controllers/user');
const PlaylistController = require('../controllers/playlist');
const FavoritesController = require('../controllers/favorites');

module.exports = (app) => {
  // User
  app.get('/api/authorize', UserController.authorize);
  app.post('/api/refresh', UserController.refreshAccessToken);
  app.get('/callback', UserController.signIn);

  // Playlist
  app.post('/api/playlist/cache', PlaylistController.cachePlaylist);
  app.post('/api/playlists', PlaylistController.fetchPlaylists);
  app.post('/api/playlist/save', PlaylistController.savePlaylist);

  // Favorites
  app.post('/api/favorite', FavoritesController.addFavorite);
  app.delete('/api/favorite', FavoritesController.deleteFavorite);
};
