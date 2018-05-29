import { createAction } from 'redux-actions';

import api from '../api';
import delayedAnimation from '../utils/delayedAnimation';
import { isError } from '../utils/helpers';
import * as h from '../utils/dispatchHelpers';

const noSavedPlaylists = (data) => data.playlists.error;

export const noCurrentPlaylistError = createAction('NO_CURRENT_PLAYLIST_ERROR');

export const savePlaylist = (playlistData, spotifyId) => async (dispatch) => {
  delayedAnimation(dispatch);

  const response = await api.savePlaylistSent(playlistData, spotifyId);

  if (isError(response)) {
    console.error(response.statusText);
    return;
  }

  const { playlistId } = response.data;

  dispatch(h.savePlaylistSuccess(playlistId, playlistData));
};

export const fetchAllPlaylists = (spotifyId) => async (dispatch) => {
  const response = await api.fetchAllPlaylistsSent(spotifyId);
  const { data } = response;

  if (noSavedPlaylists(data)) {
    dispatch(h.updateCache(response));
    return;
  }

  dispatch(h.fetchAllPlaylistsSuccess(data));
};

export const setCurrentPlaylist = (playlistId, callback) => (dispatch) => {
  dispatch(h.setCurrentPlaylistSuccess(playlistId));
  callback();
};
