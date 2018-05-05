const mongoose = require('mongoose');

const { Schema } = mongoose;

const PlaylistSchema = new Schema({
  playlistId: {
    type: String
  },
  title: {
    type: String
  },
  tracks: {
    type: Array
  }
});

const UserSchema = new Schema({
  spotifyId: {
    type: Number
  },
  name: {
    type: String
  },
  accessToken: {
    type: String
  },
  refreshToken: {
    type: String
  },
  playlists: [PlaylistSchema]
});

module.exports = mongoose.model('User', UserSchema);
