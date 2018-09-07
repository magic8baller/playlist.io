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
  app.get('/api/playlists/cached/:spotifyId', PlaylistController.fetchCachedPlaylists);
  app.get('/api/playlists/saved/:spotifyId', PlaylistController.fetchSavedPlaylists);
  app.get('/api/playlists/all/:spotifyId', PlaylistController.fetchAllPlaylists);
  app.post('/api/playlist/cache/:spotifyId', PlaylistController.cachePlaylist);
  app.post('/api/playlist/save/:userId', PlaylistController.savePlaylist);

  // Favorites
  app.get('/api/favorites/:spotifyId', FavoritesController.fetchAllFavorites);
  app.post('/api/favorite/:userId', FavoritesController.addFavorite);
  app.delete('/api/favorite/:userId', FavoritesController.deleteFavorite);
};
