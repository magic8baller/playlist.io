import { isProdEnv } from './helpers';

const SPOTIFY_BASE_API = 'https://api.spotify.com/v1/';
export const SPOTIFY_SEARCH_ENDPOINT = `${SPOTIFY_BASE_API}search?limit=50&type=playlist&`;

// TODO: Refactor duplicate isProdEnv() calls

export const DOMAIN = isProdEnv() ? process.env.REACT_APP_PROD_DOMAIN : '';

export const SIGN_IN_USER_ENDPOINT = isProdEnv()
  ? process.env.REACT_APP_PROD_SIGN_IN_USER
  : process.env.REACT_APP_DEV_SIGN_IN_USER;

export const SAVE_PLAYLIST_ENDPOINT = isProdEnv()
  ? process.env.REACT_APP_PROD_SAVE_PLAYLIST
  : process.env.REACT_APP_DEV_SAVE_PLAYLIST;

export const FETCH_SAVED_PLAYLISTS_ENDPOINT = isProdEnv()
  ? process.env.REACT_APP_PROD_FETCH_PLAYLISTS
  : process.env.REACT_APP_DEV_FETCH_PLAYLISTS;
