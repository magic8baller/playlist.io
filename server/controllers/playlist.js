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

module.exports = {
  save
};
