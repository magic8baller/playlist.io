import axios from 'axios';
import { curry } from 'ramda';

import { SPOTIFY_SEARCH_ENDPOINT } from '../utils/endpoints';

export default {
  fetchPlaylistSent: async (token, query, config) => {
    const SPOTIFY_SEARCH_URL_WITH_QUERY = `${SPOTIFY_SEARCH_ENDPOINT}q=${encodeURIComponent(
      query
    )}`;

    return axios.get(SPOTIFY_SEARCH_URL_WITH_QUERY, config);
  },
  getPlaylistTracks: curry(async (config, playlist) => {
    const tracksEndpoint = playlist.tracks.href;
    const response = await axios.get(tracksEndpoint, config);
    return response.data.items;
  })
};
