import { createAction } from 'redux-actions';
import { isEmpty } from 'ramda';

import api from '../api';
import createPlaylist from '../utils/createPlaylist';
import { setHeaders } from '../utils/helpers';
import * as h from '../utils/dispatchHelpers';
import { isError } from '../utils/helpers';

export const returnCachedPlaylist = createAction('RETURN_CACHED_PLAYLIST');

export const setCurrentQuery = createAction('SET_CURRENT_QUERY');

export const fetchPlaylist = (spotifyId, token, query) => async (dispatch) => {
  dispatch(h.deleteCurrentPlaylist());
  dispatch(h.currentPlaylistSuccess());

  const config = {
    headers: setHeaders(token)
  };

  const playlistResponse = await api.fetchPlaylistSent(token, query, config);

  if (isError(playlistResponse)) {
    console.error(playlistResponse.statusText);
    return;
  }

  const playlists = playlistResponse.data.playlists.items;

  if (isEmpty(playlists)) {
    dispatch(h.resolveCurrentPlaylist());
    return;
  }

  const playlist = await createPlaylist(playlists, config);
  dispatch(h.fetchPlaylistSuccess(playlist));

  const cacheResponse = await api.cachePlaylistInDb(spotifyId, query, playlist);
  dispatch(h.updateCache(cacheResponse));
};
