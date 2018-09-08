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

  const { favorites } = targetUser;

  if (!isEmpty(favorites)) {
    res.send({ success: true, favorites });
    return;
  }

  const favoritesRes = {
    error: {
      message: 'No favorites have been saved.',
      status: code.USER_ERROR
    }
  };

  res.send({
    error: true,
    favorites: favoritesRes
  });
};
