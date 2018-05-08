import axios from 'axios';

const API_ROOT = 'http://localhost:8080/api';
const savePlaylistEndpoint = `${API_ROOT}/playlist`;
const fetchSavedPlaylistsEndpoint = `${API_ROOT}/playlists`;

export const savePlaylist = ({ spotifyId, title, tracks }) => (dispatch) => {
  axios
    .post(savePlaylistEndpoint, { spotifyId, title, tracks })
    .then((res) => {
      const { playlistId } = res.data;
      dispatch({ type: 'SAVE_PLAYLIST', payload: { playlistId, title, tracks } });
    })
    .catch((err) => {
      console.log(err);
    });
};

export const setCurrentPlaylist = (playlistId, callback) => (dispatch) => {
  dispatch({ type: 'SET_CURRENT_PLAYLIST', playlistId });
  callback();
};

export const fetchSavedPlaylists = (spotifyId) => (dispatch) => {
  axios
    .post(fetchSavedPlaylistsEndpoint, { spotifyId })
    .then((res) => {
      dispatch({ type: 'FETCH_SAVED_PLAYLISTS', payload: res.data.playlists });
    })
    .catch((err) => {
      console.log(err);
    });
};
