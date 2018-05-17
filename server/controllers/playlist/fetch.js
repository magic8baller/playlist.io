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
    res.send({ error: { code: code.USER_ERROR, message: 'No playlists have been saved.' } });
    return;
  }

  res.send({ success: true, playlists });
};
