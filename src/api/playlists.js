import axios from 'axios';

import { SAVE_PLAYLIST_ENDPOINT, FETCH_SAVED_PLAYLISTS_ENDPOINT } from '../utils/endpoints';

export default {
  savePlaylistSent: (playlistData, spotifyId) =>
    axios.post(`${SAVE_PLAYLIST_ENDPOINT}/${spotifyId}`, { ...playlistData }),
  fetchSavedPlaylistsSent: (spotifyId) =>
    axios.get(`${FETCH_SAVED_PLAYLISTS_ENDPOINT}/${spotifyId}`, { spotifyId })
};
