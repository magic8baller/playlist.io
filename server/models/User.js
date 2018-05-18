const mongoose = require('mongoose');

const { Schema } = mongoose;

const PlaylistSchema = new Schema({
  title: { type: String },
  tracks: { type: Array }
});

const FavoriteSchema = new Schema({
  id: { type: String },
  name: { type: String },
  album: { type: Object },
  artists: { type: Array }
});

const UserSchema = new Schema({
  spotifyId: { type: String },
  name: { type: String },
  accessToken: { type: String },
  refreshToken: { type: String },
  playlists: [PlaylistSchema],
  favorites: [FavoriteSchema]
});

module.exports = mongoose.model('User', UserSchema);
