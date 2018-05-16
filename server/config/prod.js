module.exports = {
  mongoURI: `${process.env.PROD_MONGO_URI_ROOT}${encodeURIComponent(
    process.env.PROD_MONGO_URI_UN_AND_PW
  )}${process.env.PROD_MONGO_URI_END}`,
  spotifyClientId: process.env.PROD_SPOTIFY_CLIENT_ID,
  spotifyClientSecret: process.env.PROD_SPOTIFY_CLIENT_SECRET,
  redirectUri: process.env.PROD_REDIRECT_URI,
  frontendDomain: process.env.PROD_FRONTEND_DOMAIN
};
