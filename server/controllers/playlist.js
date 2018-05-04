const User = require('../models/User');
const randomId = require('uuid');

const save = async (req, res, next) => {
  const playlistId = randomId();
  const newPlaylist = { ...req.body, playlistId };

  const targetUser = User.findOne({ spotifyId: req.body.spotifyId });

  console.log(targetUser.playlists);
  // targetUser.playlists.push(newPlaylist);
  // await targetUser.save();

  // res.send(targetUser);
};

module.exports = {
  save
};
