import axios from 'axios';

import { SAVE_PLAYLIST_ENDPOINT, FETCH_SAVED_PLAYLISTS_ENDPOINT } from '../utils/endpoints';

export default {
  savePlaylistSent: (playlistData) => axios.post(SAVE_PLAYLIST_ENDPOINT, { ...playlistData }),
  fetchSavedPlaylistsSent: (spotifyId) => axios.post(FETCH_SAVED_PLAYLISTS_ENDPOINT, { spotifyId })
};
