const request = require('request');

const code = require('../../utils/statusCodes');
const User = require('../../models/User');

module.exports = async (req, res) => {
  const { spotifyId, spotifyData } = req.body;

  const targetUser = await User.findOne({ spotifyId });

  targetUser.favorites.push({ ...spotifyData });

  await targetUser.save();

  res.send({ success: true });
};
