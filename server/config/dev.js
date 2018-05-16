module.exports = {
  mongoURI: `${process.env.DEV_MONGO_URI_ROOT}${encodeURIComponent(
    process.env.DEV_MONGO_URI_UN_AND_PW
  )}${process.env.DEV_MONGO_URI_END}`,
  spotifyClientId: process.env.DEV_SPOTIFY_CLIENT_ID,
  spotifyClientSecret: process.env.DEV_SPOTIFY_CLIENT_SECRET,
  redirectUri: process.env.DEV_REDIRECT_URI,
  frontendDomain: process.env.DEV_FRONTEND_DOMAIN
};
