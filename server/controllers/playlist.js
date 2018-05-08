const User = require('../models/User');
const randomId = require('uuid');

const save = async (req, res, next) => {
  const playlistId = randomId();
  const newPlaylist = { ...req.body, playlistId };

  const targetUser = await User.findOne({ spotifyId: req.body.spotifyId });

  targetUser.playlists.push(newPlaylist);
  await targetUser.save();

  res.send({ success: true, playlistId });
};

const fetch = async (req, res, next) => {
  const targetUser = await User.findOne({ spotifyId: req.body.spotifyId });

  if (!targetUser) {
    const errMsg = 'Invalid Spotify ID';
    next(errMsg);
    return;
  }

  const { playlists } = targetUser;

  res.send({ success: true, playlists });
};

module.exports = {
  save,
  fetch
};
