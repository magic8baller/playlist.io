import axios from 'axios';
import { isEmpty } from 'ramda';

import createPlaylist from '../utils/createPlaylist';
import { SPOTIFY_SEARCH_ENDPOINT } from '../utils/endpoints';
import { setHeaders } from '../utils/helpers';

export const fetchPlaylist = (token, query) => {
  const spotifySearchUrlWithQuery = `${SPOTIFY_SEARCH_ENDPOINT}q=${encodeURIComponent(query)}`;

  const config = {
    headers: setHeaders(token)
  };

  return async (dispatch) => {
    dispatch({ type: 'DELETE_CURRENT_PLAYLIST' });

    const results = await axios.get(spotifySearchUrlWithQuery, config).catch((err) => {
      const errMsg = 'Token is invalid.';
      return { type: 'SEARCH_ERROR', payload: errMsg };
    });

    // if token is invalid, return from the function
    if (!results) return;

    const playlists = results.data.playlists.items;

    if (isEmpty(playlists)) {
      dispatch({ type: 'RESOLVE_CURRENT_PLAYLIST' });
      return;
    }

    const playlist = await createPlaylist(playlists, config);
    dispatch({ type: 'ADD_PLAYLIST', payload: playlist });
  };
};
