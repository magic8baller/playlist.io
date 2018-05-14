import axios from 'axios';
import { createAction } from 'redux-actions';

import delayedAnimation from '../utils/delayedAnimation';
import { SAVE_PLAYLIST_ENDPOINT, FETCH_SAVED_PLAYLISTS_ENDPOINT } from '../utils/endpoints';

export const savePlaylist = (data) => (dispatch) => {
  delayedAnimation(dispatch);

  axios
    .post(SAVE_PLAYLIST_ENDPOINT, { ...data })
    .then((res) => {
      const { playlistId } = res.data;
      const { title, tracks } = data;

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
    .post(FETCH_SAVED_PLAYLISTS_ENDPOINT, { spotifyId })
    .then((res) => {
      const { data } = res;

      data.error
        ? dispatch({ type: 'NO_SAVED_PLAYLISTS_ERROR', payload: data.error })
        : dispatch({ type: 'FETCH_SAVED_PLAYLISTS', payload: data.playlists });
    })
    .catch((err) => {
      console.log(err);
    });
};
