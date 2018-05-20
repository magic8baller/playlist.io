const curry = require('ramda/src/curry');
const filter = require('ramda/src/filter');
const pipe = require('ramda/src/pipe');

const updateFavorites = curry((targetUser, updatedFavorites) => {
  targetUser.favorites = updatedFavorites;
});

const isTargetId = curry((trackData, { id }) => id !== trackData.id);

const filterOutTargetTrack = curry((trackData, { favorites }) =>
  filter(isTargetId(trackData), favorites)
);

const deleteFromFavorites = (trackData, targetUser) =>
  pipe(filterOutTargetTrack(trackData), updateFavorites(targetUser))(targetUser);

module.exports = deleteFromFavorites;
