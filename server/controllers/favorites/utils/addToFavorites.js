const addToFavorites = (targetUser, trackData) => {
  targetUser.favorites.push({ ...trackData, isFavorited: true });
};

module.exports = addToFavorites;
