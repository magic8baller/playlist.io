module.exports = {
  mongoURI: `${process.env.PROD_MONGO_URI_ROOT}${encodeURIComponent(
    process.env.PROD_MONGO_URI_UN_AND_PW
  )}${process.env.PROD_MONGO_URI_END}`,
  spotifyClientId: process.env.DEV_SPOTIFY_CLIENT_ID,
  spotifyClientSecret: process.env.DEV_SPOTIFY_CLIENT_SECRET,
  spotifyRefreshToken: process.env.DEV_SPOTIFY_REFRESH_TOKEN,
  spotifyAccessToken: process.env.DEV_SPOTIFY_ACCESS_TOKEN,
  spotifyId: process.env.DEV_SPOTIFY_ID,
  tokenSecret: process.env.DEV_TOKEN_SECRET
};
