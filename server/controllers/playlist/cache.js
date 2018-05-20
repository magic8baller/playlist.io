const curry = require('ramda/src/curry');
const pipe = require('ramda/src/pipe');

const code = require('../../utils/statusCodes');
const User = require('../../models/User');

const formatPlaylist = curry((query, playlist) => ({
  query,
  tracks: [...playlist]
}));

const pushToCache = curry((targetUser, formattedPlaylist) => {
  targetUser.cache.push({ ...formattedPlaylist });
  return targetUser;
});

const save = async (targetUser) => {
  await targetUser.save();
};

const saveToCache = async (targetUser, query, playlist) =>
  pipe(formatPlaylist(query), pushToCache(targetUser), save)(playlist);

module.exports = async (req, res, next) => {
  const { spotifyId, playlist, query } = req.body;

  const targetUser = await User.findOne({ spotifyId });

  await saveToCache(targetUser, query, playlist);

  res.send({ success: true });
};
