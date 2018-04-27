const mongoose = require('mongoose');

const { Schema } = mongoose;

const TrackSchema = new Schema({
  spotifyId: {
    type: Number
  },
  artist: {
    type: String
  },
  album: {
    name: String,
    image: String
  },
  name: {
    type: String
  }
});

const PlaylistSchema = new Schema({
  spotifyId: {
    type: Number
  },
  title: {
    type: String
  },
  tracks: [TrackSchema]
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
