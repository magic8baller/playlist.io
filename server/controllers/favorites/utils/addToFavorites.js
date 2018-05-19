const addToFavorites = (targetUser, trackData) => {
  targetUser.favorites.push({ ...trackData, isFavorite: true });
};

module.exports = addToFavorites;
