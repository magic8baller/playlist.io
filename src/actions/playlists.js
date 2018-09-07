import { createAction } from 'redux-actions';

import api from '../api';
import delayedAnimation from '../utils/delayedAnimation';
import artists from '../utils/data';
import { isError } from '../utils/helpers';
import generateId from 'uuid/v4';
import * as h from '../utils/dispatchHelpers';

const noSavedPlaylists = (data) => data.playlists.error;

export const noCurrentPlaylistError = createAction('NO_CURRENT_PLAYLIST_ERROR');

export const savePlaylist = (playlistData, userId, isDemoUser) => async (dispatch) => {
  delayedAnimation(dispatch);

  if (isDemoUser) {
    const playlistId = generateId();
    dispatch(h.savePlaylistSuccess(playlistId, playlistData));
    return;
  }

  const response = await api.savePlaylistSent(playlistData, userId);

  if (isError(response)) {
    console.error(response.statusText);
    debugger;
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

const demoPlaylistNames = ['Drake', 'Marshmello', 'Justin Biebz', 'Ariana Grande'];
const demoPlaylistTracks = [artists.drake, artists.marshmello, artists.biebz, artists.ariana];

export const saveDemoPlaylists = () => (dispatch) => {
  const playlists = demoPlaylistNames.map((name, idx) => ({
    title: name,
    query: name,
    _id: idx,
    tracks: demoPlaylistTracks[idx]
  }));

  dispatch(h.saveDemoPlaylists(playlists));

  return { success: true };
};

export const saveDemoCurrentPlaylist = (playlist, cb) => (dispatch) => {
  dispatch(h.saveDemoCurrentPlaylist(playlist));
  cb();
};
