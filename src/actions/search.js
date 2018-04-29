import axios from 'axios';
import { isEmpty } from 'ramda';
import createPlaylist from '../utils/createPlaylist';

/*
===== Constants =======
*/

const SPOTIFY_BASE_API = 'https://api.spotify.com/v1/';
const SPOTIFY_SEARCH_ENDPOINT = `${SPOTIFY_BASE_API}search?limit=50&type=playlist&`;

/*
===== Helpers =======
*/

const setHeaders = (token) => ({
  Authorization: `Bearer ${token}`
});

/*
===== Actions =======
*/

export const fetchPlaylist = (token, query) => {
  const spotifySearchUrlWithQuery = `${SPOTIFY_SEARCH_ENDPOINT}q=${encodeURIComponent(query)}`;

  const config = {
    headers: setHeaders(token)
  };

  return async (dispatch) => {
    const results = await axios.get(spotifySearchUrlWithQuery, config).catch((err) => {
      const errMsg = 'Token is invalid.';
      return { type: 'SEARCH_ERROR', payload: errMsg };
    });

    // if token is invalid, return from the function
    if (!results) return;

    const playlists = results.data.playlists.items;

    if (isEmpty(playlists)) {
      const errMsg = `No playlists found containing "${query}". Please try again.`;
      return { type: 'SEARCH_ERROR', payload: errMsg };
    }

    const playlist = await createPlaylist(playlists, config);

    dispatch({ type: 'ADD_PLAYLIST', payload: playlist });
  };
};
