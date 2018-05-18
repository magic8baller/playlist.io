const code = require('../../utils/statusCodes');
const User = require('../../models/User');

module.exports = async (req, res, next) => {
  const targetUser = await User.findOne({ spotifyId: req.body.spotifyId });

  if (!targetUser) {
    const errMsg = 'Invalid Spotify ID';
    next(errMsg);
    return;
  }

  const { playlists } = targetUser;

  if (!playlists.length) {
    const errMsg = 'No playlists have been saved.';
    next(errMsg);
    return;
  }

  res.send({ success: true, playlists });
};
