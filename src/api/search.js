import axios from 'axios';
import { curry } from 'ramda';

import {
  SPOTIFY_SEARCH_ENDPOINT,
  CACHE_PLAYLIST_ENDPOINT,
  SPOTIFY_RECOMMENDATION_ENDPOINT
} from '../utils/endpoints';

export default {
  fetchPlaylistSent: async (token, query, config) => {
    const SPOTIFY_RECOMMENDATION_URL_WITH_QUERY = `${SPOTIFY_RECOMMENDATION_ENDPOINT}${encodeURIComponent(
      query
    )}`;

    return axios.get(SPOTIFY_RECOMMENDATION_URL_WITH_QUERY, config);
  },
  getPlaylistTracks: curry(async (config, playlist) => {
    const tracksEndpoint = playlist.tracks.href;
    const response = await axios.get(tracksEndpoint, config);
    return response.data.items;
  }),
  cachePlaylistInDb: (spotifyId, query, playlist) =>
    axios.post(`${CACHE_PLAYLIST_ENDPOINT}/${spotifyId}`, { query, playlist })
};
