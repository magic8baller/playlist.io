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

  const playlist = await api.fetchPlaylistSent(token, query, config);

  if (isError(playlist)) {
    console.error(playlist.statusText);
    return;
  }
  console.log(playlist.data.tracks);
  dispatch(h.fetchPlaylistSuccess(playlist.data.tracks));

  // const cacheResponse = await api.cachePlaylistInDb(spotifyId, query, playlist);
  // dispatch(h.updateCache(cacheResponse));
};
