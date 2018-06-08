import axios from 'axios';

import { setHeaders } from '../utils/helpers';

import {
  SPOTIFY_ARTIST_ENDPOINT,
  CACHE_PLAYLIST_ENDPOINT,
  SPOTIFY_RECOMMENDATION_ENDPOINT
} from '../utils/endpoints';

// TODO: DRY up multiple fetch calls
export default {
  fetchArtist: (token, query) => {
    const SPOTIFY_ARTIST_URL_WITH_QUERY = `${SPOTIFY_ARTIST_ENDPOINT}${encodeURIComponent(query)}`;

    const config = {
      headers: setHeaders(token)
    };

    return axios.get(SPOTIFY_ARTIST_URL_WITH_QUERY, config);
  },

  fetchPlaylistSent: (token, seed, searchType) => {
    const SPOTIFY_RECOMMENDATION_URL_WITH_QUERY = `${SPOTIFY_RECOMMENDATION_ENDPOINT}${searchType}=${encodeURIComponent(
      seed
    )}`;

    const config = {
      headers: setHeaders(token)
    };

    return axios.get(SPOTIFY_RECOMMENDATION_URL_WITH_QUERY, config);
  },

  cachePlaylistInDb: (spotifyId, query, playlist) =>
    axios.post(`${CACHE_PLAYLIST_ENDPOINT}/${spotifyId}`, { query, playlist })
};
