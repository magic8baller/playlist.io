const mongoose = require('mongoose');

const { Schema } = mongoose;

const TrackSchema = new Schema({
  id: { type: String },
  name: { type: String },
  album: { type: Object },
  artists: { type: Array },
  isFavorite: { type: Boolean, default: false }
});

const PlaylistSchema = new Schema({
  title: { type: String },
  tracks: [TrackSchema]
});

const CacheSchema = new Schema({
  query: { type: String },
  tracks: [TrackSchema]
});

const UserSchema = new Schema({
  spotifyId: { type: String },
  name: { type: String },
  accessToken: { type: String },
  refreshToken: { type: String },
  playlists: [PlaylistSchema],
  favorites: [TrackSchema],
  cache: [CacheSchema]
});

module.exports = mongoose.model('User', UserSchema);
