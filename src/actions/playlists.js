import axios from 'axios';
import { createAction } from 'redux-actions';

import api from '../api';
import delayedAnimation from '../utils/delayedAnimation';
import { isError } from '../utils/helpers';
import * as h from '../utils/dispatchHelpers';
import { FETCH_SAVED_PLAYLISTS_ENDPOINT } from '../utils/endpoints';

export const savePlaylist = (playlistData) => async (dispatch) => {
  delayedAnimation(dispatch);

  const response = await api.savePlaylistSent(playlistData);

  if (isError(response)) {
    console.error(response.statusText);
    return;
  }

  const { playlistId } = response.data;

  dispatch(h.savePlaylistSuccess(playlistId, playlistData));
};

export const fetchSavedPlaylists = (spotifyId) => async (dispatch) => {
  const response = await api.fetchSavedPlaylistsSent(spotifyId);
  const { data } = response;

  data.error
    ? dispatch(h.fetchSavedPlaylistsError(data))
    : dispatch(h.fetchSavedPlaylistsSuccess(data));
};

export const setCurrentPlaylist = (playlistId, callback) => (dispatch) => {
  dispatch(h.setCurrentPlaylistSuccess(playlistId));
  callback();
};
