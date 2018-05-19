import axios from 'axios';
import { createAction } from 'redux-actions';
import { isEmpty } from 'ramda';

import api from '../api';
import createPlaylist from '../utils/createPlaylist';
import { setHeaders } from '../utils/helpers';
import * as h from '../utils/dispatchHelpers';
import { isError } from '../utils/helpers';

export const returnCachedPlaylist = createAction('RETURN_CACHED_PLAYLIST');

export const fetchPlaylist = (token, query) => async (dispatch) => {
  dispatch(h.deleteCurrentPlaylist());

  const config = {
    headers: setHeaders(token)
  };

  const response = await api.fetchPlaylistSent(token, query, config);

  if (isError(response)) {
    console.error(response.statusText);
    return;
  }

  const playlists = response.data.playlists.items;

  if (isEmpty(playlists)) {
    dispatch(h.resolveCurrentPlaylist());
    return;
  }

  const playlist = await createPlaylist(playlists, config);
  dispatch(h.fetchPlaylistSuccess(playlist, query));
};
