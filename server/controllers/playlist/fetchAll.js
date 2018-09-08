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

  const { playlists, cache } = targetUser;

  if (!isEmpty(playlists)) {
    res.send({ success: true, playlists, cache });
    return;
  }

  const playlistsRes = {
    error: {
      message: 'No playlists have been saved.',
      status: code.USER_ERROR
    }
  };

  res.send({
    error: true,
    playlists: playlistsRes,
    cache
  });
};
