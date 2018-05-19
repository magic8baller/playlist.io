const curry = require('ramda/src/curry');
const filter = require('ramda/src/filter');
const pipe = require('ramda/src/pipe');

const updateFavorites = curry((targetUser, updatedFavorites) => {
  targetUser.favorites = updatedFavorites;
});

const isTargetId = curry((targetId, { id }) => id !== targetId);

const filterOutTargetTrack = curry((targetId, { favorites }) =>
  filter(isTargetId(targetId), favorites)
);

const deleteFromFavorites = (targetId, targetUser) =>
  pipe(filterOutTargetTrack(targetId), updateFavorites(targetUser))(targetUser);

module.exports = deleteFromFavorites;
