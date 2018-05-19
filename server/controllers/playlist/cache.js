const curry = require('ramda/src/curry');
const pipe = require('ramda/src/pipe');

const code = require('../../utils/statusCodes');
const User = require('../../models/User');

const formatPlaylist = curry((query, tracks) => ({
  query,
  tracks: [...tracks]
}));

const pushToCache = curry((targetUser, formattedPlaylist) => {
  targetUser.cache.push({ ...formattedPlaylist });
  return targetUser;
});

const save = async (targetUser) => {
  await targetUser.save();
};

const saveToCache = async (targetUser, query, tracks) =>
  pipe(formatPlaylist(query), pushToCache(targetUser), save)(tracks);

module.exports = async (req, res, next) => {
  const { spotifyId, tracks, query } = req.body;

  const targetUser = await User.findOne({ spotifyId });

  await saveToCache(targetUser, query, tracks);

  res.send({ success: true });
};
