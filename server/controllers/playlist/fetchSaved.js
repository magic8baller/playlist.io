const code = require('../../utils/statusCodes');
const User = require('../../models/User');

const isEmpty = (playlists) => !playlists.length;

module.exports = async (req, res, next) => {
  const targetUser = await User.findOne({ spotifyId: req.params.spotifyId });

  if (!targetUser) {
    const errMsg = 'Invalid Spotify ID';
    next(errMsg);
    return;
  }

  const { playlists } = targetUser;

  if (isEmpty(playlists)) {
    const errMsg = 'No playlists have been saved.';
    next(errMsg);
    return;
  }

  res.send({ success: true, playlists });
};
